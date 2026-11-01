import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { trackContactInitiate, trackSocialClick } from '../utils/analytics';
import { usePortfolio } from '../context/usePortfolio';
import './Contact.css';

const Contact = () => {
  const { data: { profile, contact } } = usePortfolio();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const phoneNumber = contact.whatsapp;
    const text = `*New message from your portfolio!*\n\n*Name:* ${formData.name}\n*Email:* ${formData.email}\n\n*Message:*\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    trackContactInitiate('WhatsApp Form Submit');

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(whatsappUrl, '_blank');
      setFormData({ name: '', email: '', message: '' });
    }, 800);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="contact-section py-24 scroll-mt-0 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-6xl mx-auto"
        >
          <div className="contact-heading">
            <div><span className="contact-kicker">Let&apos;s make something / 07</span><h2>Start a<br /><span>conversation.</span></h2></div>
            <p>Have an opportunity, a project idea, or just want to say hello? I&apos;d love to hear from you.</p>
          </div>

          <div className="contact-layout">
            <div className="contact-details-panel">
              <div className="contact-availability"><span /> AVAILABLE FOR OPPORTUNITIES</div>
              <h3>Let&apos;s build something meaningful.</h3>
              <p className="contact-details-intro">I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.</p>

              <div className="contact-methods">
                <a className="contact-method" href={`mailto:${contact.email}`} onClick={() => trackContactInitiate('Email Link Click')}>
                  <span className="contact-method-icon"><Mail size={18} /></span>
                  <span className="contact-method-copy"><span>EMAIL ME</span><strong>{contact.email}</strong></span>
                  <span className="contact-method-arrow">↗</span>
                </a>
                <a className="contact-method" href={`tel:${contact.phoneLink}`} onClick={() => trackContactInitiate('Phone Link Click')}>
                  <span className="contact-method-icon"><Phone size={18} /></span>
                  <span className="contact-method-copy"><span>CALL ME</span><strong>{contact.phone}</strong></span>
                  <span className="contact-method-arrow">↗</span>
                </a>
                <div className="contact-method">
                  <span className="contact-method-icon"><MapPin size={18} /></span>
                  <span className="contact-method-copy"><span>BASED IN</span><strong>{contact.location}</strong></span>
                </div>
              </div>

              <div className="contact-social-row">
                <span>FIND ME ELSEWHERE</span>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => trackSocialClick('GitHub Contact')}><FaGithub size={17} /></a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" onClick={() => trackSocialClick('LinkedIn Contact')}><FaLinkedin size={17} /></a>
              </div>
            </div>

            <div className="contact-form-panel">
              <div className="contact-form-heading"><div><span>CONTACT FORM</span><h3>Send a message</h3></div><span className="contact-form-mark"><Send size={17} /></span></div>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="contact-field">
                  <label htmlFor="name">Your name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-bg-primary border border-border-primary rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    placeholder="Jane Smith"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-bg-primary border border-border-primary rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors"
                    placeholder="jane@example.com"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="message">How can I help?</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full bg-bg-primary border border-border-primary rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-colors resize-none"
                    placeholder="Tell me a little about your project or idea..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Opening WhatsApp...</span>
                  ) : (
                    <>
                      Continue in WhatsApp <Send size={17} />
                    </>
                  )}
                </button>
                <p className="contact-form-note">Your message opens in WhatsApp so we can connect directly.</p>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
