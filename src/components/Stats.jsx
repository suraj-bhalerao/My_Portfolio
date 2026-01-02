import React from 'react';
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

  // GitHub contribution colors (matching GitHub's theme)
  const getContributionColor = (level) => {
    // level is 0-4
    const colors = {
      dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
      light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39']
    };
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    return colors[theme][level] || colors[theme][0];
  };

  return (
    <section id="stats" className="section">
      <div className="container">
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Coding Stats</h2>
        
        {(leetLoading || gitLoading) && <div className="text-center" style={{ color: '#888', marginBottom: '2rem' }}>Loading stats...</div>}

        <div className="glass-card" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
          
          {/* LeetCode Stats */}
          <div style={{ marginBottom: '4rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-color)', marginBottom: '1.5rem', textAlign: 'center' }}>
              LeetCode Stats
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
              <div className="stat-item" style={{ padding: '1.5rem', border: '1px solid var(--glass-border)', borderRadius: '12px', background: 'var(--card-bg)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '100px', height: '100px', marginBottom: '1rem' }}>
                  <svg width="100" height="100" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--glass-border)" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="var(--primary-color)" strokeWidth="8" 
                      strokeDasharray={`${(displayLeet.totalSolved / displayLeet.totalQuestions) * 283} 283`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {displayLeet.totalSolved}
                  </div>
                </div>
                <h4 style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>Total Solved</h4>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                <div className="stat-item" style={{ padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '12px', background: 'var(--card-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#00b8a3', fontWeight: 'bold' }}>Easy</span>
                  <span style={{ fontWeight: 'bold' }}>{displayLeet.easySolved}<span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 'normal' }}> / {displayLeet.totalEasy}</span></span>
                </div>
                <div className="stat-item" style={{ padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '12px', background: 'var(--card-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#ffc01e', fontWeight: 'bold' }}>Medium</span>
                  <span style={{ fontWeight: 'bold' }}>{displayLeet.mediumSolved}<span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 'normal' }}> / {displayLeet.totalMedium}</span></span>
                </div>
                <div className="stat-item" style={{ padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '12px', background: 'var(--card-bg)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#ff375f', fontWeight: 'bold' }}>Hard</span>
                  <span style={{ fontWeight: 'bold' }}>{displayLeet.hardSolved}<span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 'normal' }}> / {displayLeet.totalHard}</span></span>
                </div>
              </div>
            </div>
          </div>
          
          {/* GitHub Heatmap */}
          <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--text-color)', marginBottom: '1.5rem', textAlign: 'center' }}>
              GitHub Contributions
            </h3>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center',
              width: '100%',
              overflow: 'hidden',
              padding: '0 10px'
            }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(53, 1fr)', 
                gap: '2px',
                width: '100%',
                maxWidth: '800px',
                aspectRatio: '53 / 7'
              }}>
                {gitStats && gitStats.contributions ? (
                  gitStats.contributions.slice(-371).map((day, index) => (
                    <div 
                      key={index} 
                      style={{ 
                        width: '100%', 
                        height: '100%',
                        background: getContributionColor(day.level),
                        borderRadius: '1px',
                        transition: 'transform 0.2s'
                      }}
                      title={`${day.date}: ${day.count} contributions`}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.5)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    ></div>
                  ))
                ) : (
                  Array.from({ length: 371 }).map((_, i) => (
                    <div key={i} style={{ width: '100%', height: '100%', background: 'var(--glass-bg)', borderRadius: '1px' }}></div>
                  ))
                )}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '6px', marginTop: '1rem', fontSize: '0.75rem', color: '#888' }}>
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(level => (
                <div key={level} style={{ width: '10px', height: '10px', background: getContributionColor(level), borderRadius: '2px' }}></div>
              ))}
              <span>More</span>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <p style={{ color: '#888', fontSize: '0.9rem' }}>LeetCode Global Ranking: <span style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>{displayLeet.ranking}</span></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
