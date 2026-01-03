import React from 'react';
import { Terminal, Cpu } from 'lucide-react';

const About = () => {
  const skills = [
    'Java', 'Python', 
    'Selenium WebDriver', 'TestNG', 'Page Object Model',
    'Postman', 'RestAssured',
    'Maven', 'GitHub Actions',
    'Git', 'GitHub',
    'Jira',
    'WinSCP', 'AWS S3'
  ];

  return (
    <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div>
          <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>About Me</h2>
          
          <div className="grid-2" style={{ alignItems: 'start' }}>
            <div className="glass-card" style={{ padding: '2.5rem', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
                <div style={{ padding: '8px', background: 'rgba(0, 242, 255, 0.1)', borderRadius: '10px', color: 'var(--primary-color)' }}>
                  <Terminal size={24} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>My Journey</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: '1.8' }}>
                I am a dedicated Automation Test Engineer with a passion for building robust, scalable testing solutions. My journey is driven by a commitment to software excellence and a deep understanding of the automation lifecycle.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.8' }}>
                I specialize in architecting frameworks from scratch using Java, Selenium, and Appium, ensuring high-quality delivery through seamless CI/CD integration.
              </p>
            </div>
            
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', justifyContent: 'center' }}>
                <div style={{ padding: '8px', background: 'rgba(112, 0, 255, 0.1)', borderRadius: '10px', color: 'var(--secondary-color)' }}>
                  <Cpu size={24} />
                </div>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>Technical Arsenal</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', justifyContent: 'center' }}>
                {skills.map((skill) => (
                  <div 
                    key={skill} 
                    className="skill-card" 
                    style={{ 
                      padding: '0.8rem 1.2rem', 
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      color: 'var(--text-color)',
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '10px',
                      cursor: 'default',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
