import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '../context/usePortfolio';

const About = () => {
  const { data: { about } } = usePortfolio();

  return (
    <section id="about" className="py-24 scroll-mt-0 bg-bg-secondary transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="fluid-h2 font-bold mb-10 flex items-center gap-4">
            <span className="text-brand-500">01.</span> About Me
            <div className="h-[1px] bg-border-primary flex-grow ml-4"></div>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-text-secondary fluid-p leading-relaxed">
              {about.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-brand-500 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
              <div className="glass-card relative z-10 overflow-hidden rounded-2xl h-80 md:h-96 flex items-center justify-center bg-bg-primary border-2 border-border-primary">
                <div className="absolute inset-0 bg-brand-500/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500"></div>
                <img src={about.image} alt="Portfolio profile" className="w-full h-full object-cover object-[center_20%] filter grayscale group-hover:grayscale-0 transition-all duration-500 relative z-0" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
