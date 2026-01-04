import React from 'react';
import { Github, Trophy, Activity, Info } from 'lucide-react';
import useLeetCode from '../hooks/useLeetCode';
import useGitHubStats from '../hooks/useGitHubStats';

const Stats = ({ githubUsername, leetcodeUsername }) => {
  const { stats: leetStats, loading: leetLoading } = useLeetCode(leetcodeUsername);
  const { stats: gitStats, loading: gitLoading } = useGitHubStats(githubUsername);

  const fallbackLeet = {
    totalSolved: 450,
    easySolved: 150,
    totalEasy: 500,
    mediumSolved: 250,
    totalMedium: 1000,
    hardSolved: 50,
    totalHard: 400,
    ranking: '125,430'
  };

  const displayLeet = (leetStats && leetStats.status !== 'error') ? leetStats : fallbackLeet;

  const getContributionColor = (level) => {
    const colors = {
      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
    };
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    return colors[theme][level] || colors[theme][0];
  };

  return (
    <section id="stats" className="section" style={{ position: 'relative' }}>
      <div className="container">
        <div>
          <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Coding Performance</h2>

          <div className="glass-card" style={{
            padding: '3rem',
            maxWidth: '1200px',
            margin: '0 auto',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)',
            border: '1px solid var(--glass-border)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Decorative background glow */}
            <div style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '300px',
              height: '300px',
              background: 'var(--primary-color)',
              opacity: 0.05,
              filter: 'blur(100px)',
              borderRadius: '50%',
              pointerEvents: 'none'
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

              {/* LeetCode Section */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2.5rem' }}>
                  <div style={{ padding: '10px', background: 'rgba(255, 192, 30, 0.1)', borderRadius: '12px', color: '#ffc01e' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                      <path d="M12 13h7.5" />
                      <path d="M9.424 7.268l4.999 -4.999" />
                      <path d="M16.633 16.644l-2.402 2.415a3.189 3.189 0 0 1 -4.524 0l-3.77 -3.787a3.223 3.223 0 0 1 0 -4.544l3.77 -3.787a3.189 3.189 0 0 1 4.524 0l2.302 2.313" />
                    </svg>
                  </div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>LeetCode</h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2.5rem' }}>
                  <div style={{ position: 'relative', width: '130px', height: '130px' }}>
                    <svg width="130" height="130" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="54" fill="none" stroke="var(--glass-border)" strokeWidth="8" />
                      <circle
                        cx="60" cy="60" r="54" fill="none" stroke="var(--primary-color)" strokeWidth="8"
                        strokeDasharray="339.29"
                        strokeDashoffset={339.29 - (displayLeet.totalSolved / 2000) * 339.29}
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                        style={{ filter: 'drop-shadow(0 0 5px var(--primary-color))' }}
                      />
                    </svg>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                      <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)' }}>{displayLeet.totalSolved}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Solved</div>
                    </div>
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '4px' }}>Global Rank</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>#{displayLeet.ranking}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      <Activity size={14} /> Active Solver
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '1.2rem' }}>
                  {[
                    { label: 'Easy', solved: displayLeet.easySolved, total: displayLeet.totalEasy, color: '#00b8a3' },
                    { label: 'Medium', solved: displayLeet.mediumSolved, total: displayLeet.totalMedium, color: '#ffc01e' },
                    { label: 'Hard', solved: displayLeet.hardSolved, total: displayLeet.totalHard, color: '#ff375f' }
                  ].map((item) => (
                    <div key={item.label}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem' }}>
                        <span style={{ color: item.color, fontWeight: '600' }}>{item.label}</span>
                        <span style={{ color: 'var(--text-color)', fontWeight: '500' }}>{item.solved}<span style={{ color: 'var(--text-muted)', fontWeight: 'normal' }}>/{item.total}</span></span>
                      </div>
                      <div style={{ height: '8px', background: 'var(--glass-border)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div
                          style={{
                            height: '100%',
                            width: `${(item.solved / item.total) * 100}%`,
                            background: item.color,
                            borderRadius: '4px',
                            boxShadow: `0 0 10px ${item.color}44`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub Section */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2.5rem' }}>
                  <div style={{ padding: '10px', background: 'rgba(0, 242, 255, 0.1)', borderRadius: '12px', color: 'var(--primary-color)' }}>
                    <Github size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>GitHub Activity</h3>
                </div>

                <div style={{
                  width: '100%',
                  overflowX: 'auto',
                  padding: '10px 0',
                  WebkitOverflowScrolling: 'touch',
                  marginBottom: '2rem'
                }}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(53, 1fr)',
                    gap: '3px',
                    width: '100%',
                    minWidth: '700px',
                    aspectRatio: '7/1'
                  }}>
                    {gitStats && gitStats.contributions ? (
                      gitStats.contributions.slice(-371).map((day, index) => (
                        <div
                          key={index}
                          style={{
                            width: '100%',
                            height: '100%',
                            background: getContributionColor(day.level),
                            borderRadius: '2px',
                            cursor: 'pointer',
                            transition: 'background 0.3s'
                          }}
                          title={`${day.date}: ${day.count} contributions`}
                        />
                      ))
                    ) : (
                      Array.from({ length: 371 }).map((_, i) => (
                        <div key={i} style={{ width: '100%', height: '100%', background: 'var(--glass-bg)', borderRadius: '2px' }}></div>
                      ))
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Last 12 months of contributions
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map(level => (
                      <div key={level} style={{ width: '10px', height: '10px', background: getContributionColor(level), borderRadius: '2px' }}></div>
                    ))}
                    <span>More</span>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                  <div style={{ padding: '1.5rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary-color)', marginBottom: '4px' }}>
                      {gitStats?.totalContributions || '1,240'}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Commits</div>
                  </div>
                  <div style={{ padding: '1.5rem', background: 'var(--glass-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--secondary-color)', marginBottom: '4px' }}>
                      {gitStats?.currentStreak || '42'}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Day Streak</div>
                  </div>
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
