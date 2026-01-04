import React from 'react';
import useGitHub from '../hooks/useGitHub';
import { ExternalLink, Code2, Star, GitFork } from 'lucide-react';
import project1 from '../assets/project1.png';
import project2 from '../assets/project2.png';
import project3 from '../assets/project3.png';
import project4 from '../assets/project4.png';
import project5 from '../assets/project5.png';
import project6 from '../assets/project6.png';

const Projects = ({ username }) => {
  const { repos, loading, error } = useGitHub(username);

  const projects = [
    {
      id: 1,
      name: 'Data_Generation_Scripts',
      description: 'Automated scripts for generating large-scale test data sets for performance testing.',
      html_url: 'https://github.com/suraj-bhalerao/Data_Generation_Scripts',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      image: project1
    },
    {
      id: 2,
      name: 'RPI_',
      description: 'Raspberry Pi integration projects for IoT and automation tasks.',
      html_url: 'https://github.com/suraj-bhalerao/RPI_',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      image: project2
    },
    {
      id: 3,
      name: 'SAM_AUTO',
      description: 'Comprehensive automation framework for SAM application testing.',
      html_url: 'https://github.com/suraj-bhalerao/SAM_AUTO',
      language: 'Java',
      stargazers_count: 0,
      forks_count: 0,
      image: project3
    },
    {
      id: 4,
      name: 'ATCU_4G_AUTO',
      description: 'Automated testing suite for 4G ATCU units ensuring network reliability.',
      html_url: 'https://github.com/suraj-bhalerao/ATCU_4G_AUTO',
      language: 'Java',
      stargazers_count: 0,
      forks_count: 0,
      image: project4
    },
    {
      id: 5,
      name: 'SAM_API_TEST',
      description: 'RestAssured based API testing framework for validating SAM backend services.',
      html_url: 'https://github.com/suraj-bhalerao/SAM_API_TEST',
      language: 'Java',
      stargazers_count: 0,
      forks_count: 0,
      image: project5
    },
    {
      id: 6,
      name: '4G_FOTA_ACTIVITY',
      description: 'Automation scripts for 4G Firmware Over-The-Air (FOTA) update testing.',
      html_url: 'https://github.com/suraj-bhalerao/4G_FOTA_ACTIVITY',
      language: 'Python',
      stargazers_count: 0,
      forks_count: 0,
      image: project6
    }
  ];

  return (
    <section id="projects" className="section">
      <div className="container">
        <div>
          <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>Featured Projects</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {projects.map((repo) => (
              <div
                key={repo.id}
                className="glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  padding: 0,
                  border: '1px solid var(--glass-border)',
                  transition: 'transform 0.3s, border-color 0.3s'
                }}
              >
                <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
                  <img src={repo.image} alt={repo.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} className="project-img" />
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))',
                    pointerEvents: 'none'
                  }} />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ padding: '8px', background: 'rgba(0, 242, 255, 0.1)', borderRadius: '8px' }}>
                        <Code2 size={18} color="var(--primary-color)" />
                      </div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-color)' }}>{repo.name}</h3>
                    </div>
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--text-muted)', transition: 'color 0.3s' }}
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>

                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flex: 1, fontSize: '0.95rem', lineHeight: '1.6' }}>
                    {repo.description}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      background: 'var(--glass-bg)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      border: '1px solid var(--glass-border)'
                    }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--secondary-color)' }}></div>
                      {repo.language}
                    </span>
                    <div style={{ display: 'flex', gap: '12px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={14} /> {repo.stargazers_count}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><GitFork size={14} /> {repo.forks_count}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
