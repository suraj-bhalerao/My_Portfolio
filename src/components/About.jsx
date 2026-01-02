import React from 'react';

const About = () => {
  return (
    <section id="about" className="section" style={{ background: 'linear-gradient(180deg, transparent, var(--glass-bg), transparent)' }}>
      <div className="container">
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>About Me</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div className="glass-card">
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-color)' }}>My Journey</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              I am a passionate Automation Test Engineer with a strong background in ensuring software quality through robust testing frameworks. My expertise lies in designing and executing automated test scripts to enhance product reliability.
            </p>
            <p style={{ color: 'var(--text-secondary)' }}>
              I specialize in building scalable automation solutions using tools like Selenium, Appium, and Cypress. I am dedicated to integrating continuous testing into CI/CD pipelines to deliver high-quality software at speed.
            </p>
          </div>
          
          <div className="skills-grid" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {[
              'Java', 'Python', 
              'Selenium WebDriver', 'TestNG', 'Page Object Model',
              'Postman', 'RestAssured',
              'Maven', 'GitHub Actions',
              'Git', 'GitHub',
              'Jira',
              'WinSCP', 'AWS S3'
            ].map((skill) => (
              <div key={skill} className="skill-card" style={{ 
                padding: '1rem 1.5rem', 
                fontSize: '1.1rem',
                color: 'var(--text-color)',
                minWidth: '120px'
              }}>
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
