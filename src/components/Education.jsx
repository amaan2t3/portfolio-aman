import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import { usePortfolio } from '../context/usePortfolio';
import './Education.css';

const Education = () => {
  const { data: { education: educationData } } = usePortfolio();
  const icons = {
    graduation: GraduationCap,
    book: BookOpen,
    award: Award,
  };

  return (
    <section id="education" className="education-section py-24 scroll-mt-0">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-6xl mx-auto"
        >
          <div className="education-heading">
            <div><span className="education-kicker">Learning / 05</span><h2 className="fluid-h2">Education<span>.</span></h2></div>
            <p>A foundation built through study, hands-on practice, and continuous learning.</p>
            <span className="education-count">{String(educationData.length).padStart(2, '0')} <span>milestones</span></span>
          </div>

          <div className="education-grid">
            {educationData.map((item, idx) => {
              const EducationIcon = icons[item.icon] || Award;
              return (
              <motion.div
                key={`${item.degree}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="education-card"
              >
                <div className="education-card-media">
                  {item.image ? <img src={item.image} alt={`${item.institution} campus or credential`} loading="lazy" decoding="async" /> : <div className="education-card-placeholder"><EducationIcon size={34} /></div>}
                  <span className="education-card-icon"><EducationIcon size={17} /></span>
                  <span className="education-card-number">0{idx + 1}</span>
                </div>
                <div className="education-card-content">
                  <span className="education-period">{item.period}</span>
                  <h3>{item.degree}</h3>
                  <div className="education-institution"><span />{item.institution}</div>
                  <div className="education-card-bottom"><span>EDUCATION & DEVELOPMENT</span><span>↗</span></div>
                </div>
              </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
