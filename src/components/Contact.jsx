import React, { useState } from 'react';
import { CheckCircle2, Mail, MapPin, MessageSquare, Phone, Send } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { API_BASE_URL } from '../config';

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error(payload.message || 'Submission failed.');
      }

      setIsSubmitted(true);
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      setSubmitError(error.message || 'Unable to submit enquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    setFormState((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      label: 'Email',
      value: 'bhaleraosurajsa@gmail.com',
      href: 'mailto:bhaleraosurajsa@gmail.com',
      gradient: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)',
    },
    {
      icon: <Phone size={24} />,
      label: 'Phone',
      value: '+91 9730922327',
      href: 'tel:+919730922327',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #f97316 100%)',
    },
    {
      icon: <MapPin size={24} />,
      label: 'Location',
      value: 'Pune, Maharashtra',
      href: null,
      gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
    },
  ];

  return (
    <section id="contact" className="section" style={{ position: 'relative', overflow: 'hidden', padding: '100px 0' }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 className="gradient-text" style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', marginBottom: '1rem' }}>
            Get In Touch
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
            Send an enquiry and it is saved directly to your backend Excel sheet.
          </p>
        </motion.div>

        <div className="grid-2" style={{ gap: '4rem', alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {contactInfo.map((item) => (
              <div key={item.label} className="glass-card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.4rem' }}>
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: '14px',
                    display: 'grid',
                    placeItems: 'center',
                    color: '#fff',
                    background: item.gradient,
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a href={item.href} style={{ color: 'var(--text-color)', fontWeight: 600 }}>
                      {item.value}
                    </a>
                  ) : (
                    <p style={{ color: 'var(--text-color)', fontWeight: 600 }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className="glass-card"
            style={{
              padding: '2.4rem',
              borderRadius: '24px',
              background: 'var(--card-bg)',
              position: 'relative',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
              <MessageSquare size={20} color="var(--primary-color)" />
              <h3 style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>Send an Enquiry</h3>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem' }}>
              <input name="name" value={formState.name} onChange={handleChange} required placeholder="Full Name" className="form-input" />
              <input name="email" value={formState.email} onChange={handleChange} required type="email" placeholder="Email Address" className="form-input" />
              <input name="subject" value={formState.subject} onChange={handleChange} required placeholder="Subject" className="form-input" />
              <textarea name="message" value={formState.message} onChange={handleChange} required placeholder="Your message" className="form-input" rows="5" />

              {submitError ? <p style={{ color: '#ef4444', fontSize: '0.9rem' }}>{submitError}</p> : null}

              <button type="submit" className="btn-primary" disabled={isSubmitting} style={{ border: 'none', cursor: 'pointer', justifyContent: 'center' }}>
                {isSubmitting ? 'Submitting...' : 'Submit Enquiry'} {!isSubmitting ? <Send size={16} /> : null}
              </button>
            </form>

            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--bg-color)',
                    borderRadius: '24px',
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                    padding: '2rem',
                  }}
                >
                  <div>
                    <CheckCircle2 size={64} color="#22c55e" />
                    <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Enquiry Saved</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>Your message was stored successfully.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
