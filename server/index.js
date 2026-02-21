import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;
const githubToken = process.env.GITHUB_TOKEN;
const enquiriesFilePath = path.resolve(__dirname, '../enquiries.xlsx');

app.use(cors());
app.use(express.json());

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const buildLeetCodePayload = (json) => {
  const matchedUser = json?.data?.matchedUser;
  const submitStats = matchedUser?.submitStatsGlobal?.acSubmissionNum || [];
  const totalQuestions = json?.data?.allQuestionsCount || [];

  const pick = (difficulty) =>
    submitStats.find((entry) => entry.difficulty === difficulty) || { count: 0 };

  const totalSolved = pick('All').count || 0;
  const easySolved = pick('Easy').count || 0;
  const mediumSolved = pick('Medium').count || 0;
  const hardSolved = pick('Hard').count || 0;

  const totalEasy = toNumber(totalQuestions.find((entry) => entry.difficulty === 'Easy')?.count);
  const totalMedium = toNumber(totalQuestions.find((entry) => entry.difficulty === 'Medium')?.count);
  const totalHard = toNumber(totalQuestions.find((entry) => entry.difficulty === 'Hard')?.count);

  return {
    totalSolved,
    easySolved,
    mediumSolved,
    hardSolved,
    totalEasy,
    totalMedium,
    totalHard,
    totalQuestions: totalEasy + totalMedium + totalHard,
    ranking: toNumber(matchedUser?.profile?.ranking),
  };
};

const calculateCurrentStreak = (contributions = []) => {
  if (!Array.isArray(contributions) || contributions.length === 0) {
    return 0;
  }

  let streak = 0;
  for (let i = contributions.length - 1; i >= 0; i -= 1) {
    const day = contributions[i];
    if (day.count > 0) {
      streak += 1;
      continue;
    }

    const isToday = i === contributions.length - 1;
    if (isToday) {
      continue;
    }

    break;
  }
  return streak;
};

app.get('/api/stats/leetcode/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: 'https://leetcode.com/',
      },
      body: JSON.stringify({
        query: `
          query userPublicProfile($username: String!) {
            allQuestionsCount {
              difficulty
              count
            }
            matchedUser(username: $username) {
              profile {
                ranking
              }
              submitStatsGlobal {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username },
      }),
    });

    if (!response.ok) {
      throw new Error(`LeetCode upstream failed with status ${response.status}`);
    }

    const json = await response.json();
    if (!json?.data?.matchedUser) {
      return res.status(404).json({ message: 'LeetCode user not found.' });
    }

    return res.json(buildLeetCodePayload(json));
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch LeetCode stats.', detail: error.message });
  }
});

app.get('/api/github/repos/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const response = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100&type=owner`,
      {
        headers: githubToken ? { Authorization: `Bearer ${githubToken}` } : {},
      },
    );

    if (!response.ok) {
      throw new Error(`GitHub upstream failed with status ${response.status}`);
    }

    const repos = await response.json();
    return res.json(repos);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch GitHub repositories.', detail: error.message });
  }
});

app.get('/api/stats/github/:username', async (req, res) => {
  const { username } = req.params;
  if (!githubToken) {
    return res.status(503).json({
      message: 'GITHUB_TOKEN is not configured on the backend.',
    });
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${githubToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { username } }),
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL failed with status ${response.status}`);
    }

    const json = await response.json();
    if (json.errors?.length) {
      throw new Error(json.errors.map((entry) => entry.message).join(', '));
    }

    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
    const flatDays =
      calendar?.weeks?.flatMap((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
          level: ['NONE', 'FIRST_QUARTILE', 'SECOND_QUARTILE', 'THIRD_QUARTILE', 'FOURTH_QUARTILE'].indexOf(
            day.contributionLevel,
          ),
        })),
      ) || [];

    return res.json({
      totalContributions: calendar?.totalContributions || 0,
      totalCommitContributions: json?.data?.user?.contributionsCollection?.totalCommitContributions || 0,
      currentStreak: calculateCurrentStreak(flatDays),
      contributions: flatDays,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch GitHub contribution stats.', detail: error.message });
  }
});

app.post('/api/enquiries', (req, res) => {
  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const newEntry = {
    timestamp: new Date().toISOString(),
    name,
    email,
    subject,
    message,
  };

  let workbook;
  let rows = [];

  if (fs.existsSync(enquiriesFilePath)) {
    workbook = xlsx.readFile(enquiriesFilePath);
    const sheet = workbook.Sheets.Enquiries;
    rows = sheet ? xlsx.utils.sheet_to_json(sheet) : [];
  } else {
    workbook = xlsx.utils.book_new();
  }

  rows.push(newEntry);
  const worksheet = xlsx.utils.json_to_sheet(rows);
  workbook.Sheets.Enquiries = worksheet;
  if (!workbook.SheetNames.includes('Enquiries')) {
    workbook.SheetNames.push('Enquiries');
  }

  xlsx.writeFile(workbook, enquiriesFilePath);
  return res.status(201).json({ message: 'Enquiry saved successfully.' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server running at http://localhost:${PORT}`);
});
