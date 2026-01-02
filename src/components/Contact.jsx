import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="section">
      <div className="container">
        <h2 className="gradient-text" style={{ fontSize: '2.5rem', marginBottom: '3rem', textAlign: 'center' }}>Get In Touch</h2>
        
        <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--glass-bg)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--primary-color)',
                border: '1px solid var(--glass-border)'
              }}>
                <Mail size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Email</h3>
                <a href="mailto:bhaleraosurajsa@gmail.com" style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>bhaleraosurajsa@gmail.com</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--glass-bg)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--secondary-color)',
                border: '1px solid var(--glass-border)'
              }}>
                <Phone size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Phone</h3>
                <a href="tel:+919730922327" style={{ fontSize: '1.2rem', color: 'var(--text-color)' }}>+91 9730922327</a>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'var(--glass-bg)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--accent-color)',
                border: '1px solid var(--glass-border)'
              }}>
                <MapPin size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>Location</h3>
                <p style={{ fontSize: '1.2rem' }}>Pune, Maharashtra</p>
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
            <a href="mailto:bhaleraosurajsa@gmail.com" className="btn-primary" style={{ 
              padding: '12px 30px', 
              background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))',
              borderRadius: '30px',
              fontWeight: 'bold',
              display: 'inline-block',
              color: 'white'
            }}>
              Send Message
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
