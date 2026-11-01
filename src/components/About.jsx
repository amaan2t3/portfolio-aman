import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/usePortfolio';
import './About.css';

const About = () => {
  const { data: { about, profile } } = usePortfolio();

  return (
    <section id="about" className="about-section py-24 scroll-mt-0 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-6xl mx-auto"
        >
          <div className="about-heading">
            <div><span className="about-kicker">A little about me / 01</span><h2>More than<br /><span>just code.</span></h2></div>
            <p className="about-heading-note">Curious by nature. Focused on building things that are useful, thoughtful, and easy to use.</p>
          </div>

          <div className="about-layout">
            <div className="about-photo-card">
              <img src={about.image} alt={profile.name} width="900" height="1158" loading="lazy" decoding="async" />
              <div className="about-photo-wash" />
              <div className="about-photo-label"><span>THE DEVELOPER</span><strong>{profile.name}</strong></div>
              <span className="about-photo-index">01 — 03</span>
            </div>
            <div className="about-copy-card">
              <div className="about-copy-top"><span className="about-copy-mark">“</span><span className="about-copy-label">MY STORY</span></div>
              <div className="about-paragraphs">
                {about.paragraphs.map((paragraph, index) => (
                  <p key={index}><span className="about-paragraph-index">0{index + 1}</span>{paragraph}</p>
                ))}
              </div>
              <div className="about-signoff"><span>Currently learning, building, and growing.</span><span className="about-signoff-mark">✳</span></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
