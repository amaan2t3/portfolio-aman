import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, FileText } from 'lucide-react';
import { usePortfolio } from '../context/usePortfolio';
import './Certificates.css';

const Certificates = () => {
  const { data: { certificates } } = usePortfolio();

  return (
    <section id="certificates" className="certificates-section py-24 scroll-mt-0">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-6xl"
        >
          <div className="certificates-heading">
            <div><span className="certificates-kicker">Learning / 06</span><h2 className="fluid-h2">Certifications<span>.</span></h2></div>
            <p>Credentials earned through focused study and a commitment to continuous learning.</p>
            <span className="certificates-count">{String(certificates.length).padStart(2, '0')} <span>credentials</span></span>
          </div>

          <div className="certificates-grid">
            {certificates.map((cert, idx) => (
              <motion.div
                key={`${cert.title}-${idx}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="certificate-card group"
              >
                {cert.image ? (
                  <a className="certificate-card-media" href={cert.image} target="_blank" rel="noopener noreferrer" aria-label={`View ${cert.title} certificate image`}>
                    <img src={cert.image} alt={`${cert.title} certificate`} loading="lazy" decoding="async" />
                    <span className="certificate-card-number">{String(idx + 1).padStart(2, '0')}</span>
                  </a>
                ) : (
                  <div className="certificate-card-media certificate-card-placeholder">
                    <FileText size={38} aria-hidden="true" />
                    <span className="certificate-card-number">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                )}

                <div className="certificate-card-content">
                  <span className="certificate-date">{cert.date}</span>
                  <h3>{cert.title}</h3>
                  <p className="certificate-issuer"><Award size={15} aria-hidden="true" />{cert.issuer}</p>
                  {cert.link && (
                    <a className="certificate-link" href={cert.link} target="_blank" rel="noopener noreferrer">
                      View certificate <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
