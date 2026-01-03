import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Code2, Award, Clock } from 'lucide-react';
import profileImage from '../assets/profile.png';
import resumeFile from '../assets/Resume.pdf';
import useLeetCode from '../hooks/useLeetCode';

const Hero = ({ leetcodeUsername }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const { stats: leetStats } = useLeetCode(leetcodeUsername);
  
  const titles = [
    'Automation Test Engineer',
    'SDET Specialist',
    'QA Automation Expert',
    'Framework Developer'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const quickStats = [
    { icon: <Clock size={16} />, label: 'Experience', value: 'Aug 2024 - Present' },
    { icon: <Code2 size={16} />, label: 'Expertise', value: '15+ Tools' },
    { icon: <Award size={16} />, label: 'LeetCode', value: leetStats?.totalSolved || '500+' }
  ];

  return (
    <section id="home" className="section hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background Blobs (Static) */}
      <div className="hero-bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
      </div>

      <div className="container grid-2" style={{ position: 'relative', zIndex: 1 }}>
        <div className="hero-content">
          <h2 style={{ fontSize: '1.5rem', color: 'var(--primary-color)', marginBottom: '1rem', fontWeight: '500' }}>
            Hello, I'm
          </h2>
          
          <h1 style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)', fontWeight: '800', lineHeight: 1.1, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Suraj <span className="gradient-text">Bhalerao</span>
          </h1>

          <div style={{ height: '3rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '2rem', color: 'var(--text-muted)', fontWeight: '600' }}>
              {titles[titleIndex]}
            </h3>
          </div>

          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '540px', lineHeight: '1.7' }}>
            Crafting robust automation solutions to ensure software excellence. Expert in building scalable frameworks with Selenium, Appium, and Java, seamlessly integrated with modern CI/CD pipelines.
          </p>

          {/* Quick Stats Row */}
          <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
            {quickStats.map((stat, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ color: 'var(--primary-color)', background: 'var(--glass-bg)', padding: '8px', borderRadius: '10px', border: '1px solid var(--glass-border)' }}>
                  {stat.icon}
                </div>
                <div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--text-color)' }}>{stat.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="#projects" className="btn-primary" style={{ 
                padding: '14px 35px', 
                background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
                borderRadius: '30px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'white',
                boxShadow: '0 10px 20px rgba(0, 242, 255, 0.2)'
              }}>
                View Work <ArrowRight size={20} />
              </a>
              <a href={resumeFile} download="Suraj_Bhalerao_Resume.pdf" className="btn-secondary" style={{ 
                padding: '14px 35px', 
                border: '1px solid var(--glass-border)',
                background: 'var(--glass-bg)',
                borderRadius: '30px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'var(--text-color)',
                backdropFilter: 'blur(10px)'
              }}>
                Download Resume
              </a>
            </div>

            <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
              {[
                { icon: <Github size={20} />, href: "https://github.com/suraj-bhalerao", title: "GitHub" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/suraj-bhalerao27", title: "LinkedIn" },
                { icon: <Mail size={20} />, href: "mailto:bhaleraosurajsa@gmail.com", title: "Email" },
                { 
                  icon: (
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.414l-11.71 11.593a1.384 1.384 0 0 0 0 1.98l1.113 1.1 a1.358 1.358 0 0 0 1.93 0l1.13-1.113a1.384 1.384 0 0 0 0-1.98l-1.13-1.113a1.358 1.358 0 0 0-1.93 0l-1.113 1.1a1.384 1.384 0 0 0 0 1.98l11.71 11.593a1.374 1.374 0 0 0 1.922 0l11.71-11.593a1.384 1.384 0 0 0 0-1.98L14.444.414a1.374 1.374 0 0 0-.961-.414zM12 14.4l-2.4-2.4 2.4-2.4 2.4 2.4-2.4 2.4z"/>
                    </svg>
                  ), 
                  href: "https://leetcode.com/Suraj_b_27", 
                  title: "LeetCode" 
                }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  title={social.title}
                  className="social-link"
                  style={{ 
                    width: '48px', 
                    height: '48px', 
                    background: 'var(--glass-bg)', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'var(--text-color)',
                    border: '1px solid var(--glass-border)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="hero-image-container" style={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div className="glass-card hero-image-card"
            style={{ 
              padding: '15px', 
              borderRadius: '30px', 
              overflow: 'hidden',
              width: '100%',
              maxWidth: '380px',
              height: 'auto',
              aspectRatio: '1600 / 2656',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <img 
              src={profileImage} 
              alt="Suraj Bhalerao" 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                borderRadius: '20px'
              }} 
            />
            {/* Floating Badge (Static) */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                right: '-20px',
                background: 'var(--glass-bg)',
                backdropFilter: 'blur(10px)',
                padding: '12px 20px',
                borderRadius: '15px',
                border: '1px solid var(--glass-border)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }}
            >
              <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-color)' }}>Available for Hire</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator (Static) */}
      <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--text-muted)'
        }}
      >
        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Scroll</span>
        <div style={{
            width: '24px',
            height: '40px',
            border: '2px solid var(--glass-border)',
            borderRadius: '12px',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '6px'
          }}
        >
          <div style={{ width: '4px', height: '8px', background: 'var(--primary-color)', borderRadius: '2px' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
