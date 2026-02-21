import React from 'react';
import { Activity, Github } from 'lucide-react';
import useLeetCode from '../hooks/useLeetCode';
import useGitHubStats from '../hooks/useGitHubStats';

const contributionLevelColors = {
  dark: ['#1f2937', '#0f766e', '#14b8a6', '#f59e0b', '#f97316'],
  light: ['#d1d5db', '#99f6e4', '#5eead4', '#fcd34d', '#fb923c'],
};

const defaultLeetStats = {
  totalSolved: 0,
  easySolved: 0,
  totalEasy: 0,
  mediumSolved: 0,
  totalMedium: 0,
  hardSolved: 0,
  totalHard: 0,
  ranking: '---',
  totalQuestions: 0,
};

const getContributionColor = (level = 0) => {
  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  return contributionLevelColors[theme][level] || contributionLevelColors[theme][0];
};

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value || 0);
const formatRank = (value) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? formatNumber(numeric) : '---';
};

const Stats = ({ githubUsername, leetcodeUsername }) => {
  const { stats: leetStats, loading: leetLoading, error: leetError } = useLeetCode(leetcodeUsername);
  const { stats: gitStats, loading: gitLoading, error: gitError } = useGitHubStats(githubUsername);

  const displayLeet = leetStats || defaultLeetStats;
  const solvedRatio =
    displayLeet.totalQuestions > 0 ? displayLeet.totalSolved / displayLeet.totalQuestions : 0;

  return (
    <section id="stats" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>
          Coding Performance
        </h2>

        <div className="glass-card" style={{ padding: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>LeetCode</h3>
                {leetLoading ? <small style={{ color: 'var(--text-muted)' }}>Loading...</small> : null}
              </div>

              {leetError ? (
                <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{leetError}</p>
              ) : null}

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                  <svg width="130" height="130" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--glass-border)" strokeWidth="8" />
                    <circle
                      cx="60"
                      cy="60"
                      r="54"
                      fill="none"
                      stroke="var(--primary-color)"
                      strokeWidth="8"
                      strokeDasharray="339.29"
                      strokeDashoffset={339.29 - solvedRatio * 339.29}
                      strokeLinecap="round"
                      transform="rotate(-90 60 60)"
                    />
                  </svg>
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{displayLeet.totalSolved}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Solved</div>
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Global Rank</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary-color)' }}>
                    #{formatRank(displayLeet.ranking)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px', fontSize: '0.85rem' }}>
                    <Activity size={14} />
                    Active Solver
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {[
                  { label: 'Easy', solved: displayLeet.easySolved, total: displayLeet.totalEasy, color: '#14b8a6' },
                  { label: 'Medium', solved: displayLeet.mediumSolved, total: displayLeet.totalMedium, color: '#f59e0b' },
                  { label: 'Hard', solved: displayLeet.hardSolved, total: displayLeet.totalHard, color: '#ef4444' },
                ].map((item) => (
                  <div key={item.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: item.color, fontWeight: 600 }}>{item.label}</span>
                      <span>
                        {item.solved}/{item.total}
                      </span>
                    </div>
                    <div style={{ height: '8px', background: 'var(--glass-border)', borderRadius: '6px' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${item.total > 0 ? (item.solved / item.total) * 100 : 0}%`,
                          background: item.color,
                          borderRadius: '6px',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                <Github size={22} />
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>GitHub Activity</h3>
                {gitLoading ? <small style={{ color: 'var(--text-muted)' }}>Loading...</small> : null}
              </div>

              {gitError ? (
                <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{gitError}</p>
              ) : null}

              <div style={{ width: '100%', overflowX: 'auto', marginBottom: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(53, 1fr)', gap: '3px', minWidth: '700px' }}>
                  {(gitStats?.contributions?.length
                    ? gitStats.contributions.slice(-371)
                    : Array.from({ length: 371 }, (_, index) => ({ date: `day-${index}`, count: 0, level: 0 }))
                  ).map((day, index) => (
                    <div
                      key={`${day.date}-${index}`}
                      title={`${day.date}: ${day.count} contributions`}
                      style={{ width: '100%', aspectRatio: '1 / 1', borderRadius: '2px', background: getContributionColor(day.level) }}
                    />
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
                <div style={{ padding: '1.2rem', background: 'var(--card-bg)', borderRadius: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-color)' }}>
                    {formatNumber(gitStats?.totalContributions)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Year Contributions</div>
                </div>

                <div style={{ padding: '1.2rem', background: 'var(--card-bg)', borderRadius: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--secondary-color)' }}>
                    {formatNumber(gitStats?.totalCommitContributions)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Commit Contributions</div>
                </div>

                <div style={{ padding: '1.2rem', background: 'var(--card-bg)', borderRadius: '14px', textAlign: 'center' }}>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-color)' }}>
                    {formatNumber(gitStats?.currentStreak)}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Current Streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
