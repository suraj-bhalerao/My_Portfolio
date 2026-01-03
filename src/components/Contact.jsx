import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, MessageSquare, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // GOOGLE FORM CONFIGURATION
  // Replace these with your actual Google Form details
  const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfr0776F6LHIefktSkbus9nrvfpiviqHXnjRIN5jKOKlzZNew/formResponse';
  const ENTRY_IDS = {
    name: 'entry.123456789',
    email: 'entry.987654321',
    subject: 'entry.111222333',
    message: 'entry.444555666'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append(ENTRY_IDS.name, formState.name);
    formData.append(ENTRY_IDS.email, formState.email);
    formData.append(ENTRY_IDS.subject, formState.subject);
    formData.append(ENTRY_IDS.message, formState.message);

    try {
      await fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
      });
      
      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      alert('There was an error sending your message. Please try again or contact me directly via email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    { 
      icon: <Mail size={24} />, 
      label: 'Email', 
      value: 'bhaleraosurajsa@gmail.com', 
      href: 'mailto:bhaleraosurajsa@gmail.com',
      color: 'var(--primary-color)',
      gradient: 'linear-gradient(135deg, #00f2ff 0%, #0060ff 100%)'
    },
    { 
      icon: <Phone size={24} />, 
      label: 'Phone', 
      value: '+91 9730922327', 
      href: 'tel:+919730922327',
      color: 'var(--secondary-color)',
      gradient: 'linear-gradient(135deg, #7000ff 0%, #d100ff 100%)'
    },
    { 
      icon: <MapPin size={24} />, 
      label: 'Location', 
      value: 'Pune, Maharashtra', 
      href: null,
      color: '#ff375f',
      gradient: 'linear-gradient(135deg, #ff375f 0%, #ff8a00 100%)'
    }
  ];

  const socials = [
    { icon: <Github size={20} />, href: 'https://github.com/suraj-bhalerao', label: 'GitHub', color: '#333' },
    { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/suraj-bhalerao27', label: 'LinkedIn', color: '#0077b5' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter', color: '#1da1f2' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden', padding: '100px 0' }}>
      {/* Enhanced Background Elements */}
      <div style={{ 
        position: 'absolute', 
        top: '-10%', 
        right: '-5%', 
        width: '500px', 
        height: '500px', 
        background: 'radial-gradient(circle, var(--primary-color) 0%, transparent 70%)', 
        opacity: 0.05, 
        filter: 'blur(80px)',
        zIndex: 0
      }} />
      <div style={{ 
        position: 'absolute', 
        bottom: '-10%', 
        left: '-5%', 
        width: '400px', 
        height: '400px', 
        background: 'radial-gradient(circle, var(--secondary-color) 0%, transparent 70%)', 
        opacity: 0.05, 
        filter: 'blur(80px)',
        zIndex: 0
      }} />
      
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <h2 className="gradient-text" style={{ 
            fontSize: 'clamp(3rem, 6vw, 4rem)', 
            fontWeight: '900', 
            marginBottom: '1.5rem',
            letterSpacing: '-0.03em'
          }}>
            Get In Touch
          </h2>
          <p style={{ 
            color: 'var(--text-secondary)', 
            fontSize: '1.2rem', 
            maxWidth: '700px', 
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Ready to elevate your software quality? Let's build something extraordinary together.
          </p>
        </motion.div>
        
        <div className="grid-2" style={{ gap: '5rem', alignItems: 'start' }}>
          {/* Contact Info Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="glass-card"
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '2rem', 
                    padding: '2rem',
                    borderRadius: '24px',
                    border: '1px solid var(--glass-border)',
                    background: 'rgba(255, 255, 255, 0.02)',
                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.2)',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                  }}
                  whileHover={{ 
                    scale: 1.03, 
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    boxShadow: '0 20px 40px -15px rgba(0,0,0,0.3)'
                  }}
                >
                  <div style={{ 
                    width: '64px', 
                    height: '64px', 
                    background: item.gradient, 
                    borderRadius: '18px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    color: 'white',
                    boxShadow: `0 10px 20px -5px ${item.color}40`,
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '0.8rem', 
                      color: 'var(--text-muted)', 
                      textTransform: 'uppercase', 
                      letterSpacing: '2px', 
                      marginBottom: '6px',
                      fontWeight: '700'
                    }}>
                      {item.label}
                    </h3>
                    {item.href ? (
                      <a href={item.href} style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: '700', 
                        color: 'var(--text-color)', 
                        transition: 'all 0.3s ease',
                        textDecoration: 'none'
                      }}
                      className="contact-link"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-color)' }}>
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} style={{ padding: '0 1rem' }}>
              <h3 style={{ 
                fontSize: '1.3rem', 
                fontWeight: '800', 
                marginBottom: '2rem', 
                color: 'var(--text-color)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{ width: '30px', height: '2px', background: 'var(--primary-color)' }} />
                Connect with me
              </h3>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                {socials.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ 
                      y: -8, 
                      scale: 1.1,
                      backgroundColor: 'var(--primary-color)', 
                      color: 'white',
                      boxShadow: '0 15px 30px -10px rgba(0, 242, 255, 0.5)'
                    }}
                    whileTap={{ scale: 0.9 }}
                    style={{ 
                      width: '56px', 
                      height: '56px', 
                      background: 'rgba(255, 255, 255, 0.03)', 
                      borderRadius: '16px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'var(--text-color)',
                      border: '1px solid var(--glass-border)',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
                    }}
                    title={social.label}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="glass-card"
            style={{ 
              padding: '3.5rem', 
              borderRadius: '32px',
              border: '1px solid var(--glass-border)',
              background: 'rgba(255, 255, 255, 0.01)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 30px 60px -20px rgba(0,0,0,0.4)',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '3rem' }}>
              <div style={{ 
                padding: '12px', 
                background: 'rgba(0, 242, 255, 0.1)', 
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageSquare size={24} color="var(--primary-color)" />
              </div>
              <h3 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-color)', letterSpacing: '-0.02em' }}>
                Send me Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Full Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter your name"
                    style={{ 
                      padding: '16px 20px', 
                      background: 'rgba(255, 255, 255, 0.03)', 
                      border: '1px solid var(--glass-border)', 
                      borderRadius: '14px',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    className="form-input"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    placeholder="name@example.com"
                    style={{ 
                      padding: '16px 20px', 
                      background: 'rgba(255, 255, 255, 0.03)', 
                      border: '1px solid var(--glass-border)', 
                      borderRadius: '14px',
                      color: 'white',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Inquiry / Collaboration"
                  style={{ 
                    padding: '16px 20px', 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    border: '1px solid var(--glass-border)', 
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  className="form-input"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>Your Message</label>
                <textarea 
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  placeholder="Tell me about your project..."
                  rows="5"
                  style={{ 
                    padding: '16px 20px', 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    border: '1px solid var(--glass-border)', 
                    borderRadius: '14px',
                    color: 'white',
                    fontSize: '1rem',
                    outline: 'none',
                    resize: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  className="form-input"
                ></textarea>
              </div>

              <motion.button 
                type="submit"
                disabled={isSubmitting}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 15px 30px rgba(0, 242, 255, 0.3)',
                  background: 'linear-gradient(45deg, var(--secondary-color), var(--primary-color))'
                }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  padding: '18px', 
                  background: 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))', 
                  border: 'none', 
                  borderRadius: '14px',
                  color: 'white',
                  fontWeight: '800',
                  fontSize: '1.1rem',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginTop: '1rem',
                  transition: 'all 0.3s ease',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send me Message'} 
                {!isSubmitting && <Send size={20} />}
              </motion.button>
            </form>

            {/* Success Message Overlay */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    background: 'rgba(10, 10, 15, 0.95)',
                    borderRadius: '32px',
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center', 
                    justifyContent: 'center',
                    zIndex: 10,
                    backdropFilter: 'blur(10px)',
                    textAlign: 'center',
                    padding: '2rem'
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
                  >
                    <CheckCircle2 size={80} color="#10b981" />
                  </motion.div>
                  <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', marginTop: '1.5rem', marginBottom: '1rem' }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    Thank you for reaching out. I'll get back to you as soon as possible.
                  </p>
                  <motion.button
                    onClick={() => setIsSubmitted(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{ 
                      marginTop: '2rem',
                      padding: '10px 25px',
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: '10px',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .form-input:focus {
          border-color: var(--primary-color) !important;
          background: rgba(255, 255, 255, 0.08) !important;
          box-shadow: 0 0 20px rgba(0, 242, 255, 0.1);
        }
        .contact-link:hover {
          color: var(--primary-color) !important;
          padding-left: 5px;
        }
      `}} />
    </section>
  );
};

export default Contact;
