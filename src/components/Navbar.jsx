import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Check system preference or saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Stats', href: '#stats' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md py-4' : 'bg-transparent py-6'}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '1rem 2rem' : '1.5rem 2rem',
        background: scrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
        transition: 'all 0.3s ease'
      }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-color)' }}>
          Suraj<span style={{ color: 'var(--primary-color)' }}>.dev</span>
        </a>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                color: 'var(--text-color)',
                opacity: 0.8,
                transition: 'color 0.3s',
                fontSize: '0.9rem',
                fontWeight: 500
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--primary-color)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-color)'}
            >
              {link.name}
            </a>
          ))}

          <button
            onClick={toggleTheme}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-color)',
              transition: 'all 0.3s ease'
            }}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="mobile-toggle" style={{ display: 'none', alignItems: 'center', gap: '2rem' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-color)',
              cursor: 'pointer'
            }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-color)', cursor: 'pointer' }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            zIndex: 998
          }}
        />
      )}
      <div style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-100%',
        width: '80%',
        height: '100vh',
        background: 'var(--bg-color)',
        borderLeft: '1px solid var(--glass-border)',
        padding: '80px 40px',
        transition: 'right 0.3s ease',
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem'
      }}>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            style={{
              color: 'var(--text-color)',
              fontSize: '1.2rem',
              fontWeight: 500
            }}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
