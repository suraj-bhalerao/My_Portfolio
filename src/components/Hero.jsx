import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ArrowRight, Code2 } from 'lucide-react';
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
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                      <path d="M12 13h7.5" />
                      <path d="M9.424 7.268l4.999 -4.999" />
                      <path d="M16.633 16.644l-2.402 2.415a3.189 3.189 0 0 1 -4.524 0l-3.77 -3.787a3.223 3.223 0 0 1 0 -4.544l3.77 -3.787a3.189 3.189 0 0 1 4.524 0l2.302 2.313" />
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
              maxWidth: '340px',
              height: 'auto',
              aspectRatio: '1 / 1.4',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--glass-border)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.2)',
              background: 'var(--glass-bg)',
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
              boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
            }}
            >
              <div style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 10px #10b981' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--text-color)' }}>Available for Hire</span>
            </div>
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
