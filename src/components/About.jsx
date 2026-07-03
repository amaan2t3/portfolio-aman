import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 scroll-mt-0 bg-[#0F172A]">
      <div className="container mx-auto px-6">
        <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10 flex items-center gap-4">
          <span className="text-brand-500">01.</span> About Me
          <div className="h-[1px] bg-slate-700 flex-grow ml-4"></div>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
            <p>
              Hello! My name is <span className="text-brand-500 font-medium">Amanullah</span> and I enjoy creating things that live on the internet. My interest in web development started back when I was exploring how interactive websites were built, which led me down the path of becoming a full-stack developer.
            </p>
            <p>
              I am currently a <span className="text-white font-medium">BSCS student at Virtual University of Pakistan (2024–Present)</span>, and I recently completed a specialized certification in MERN Stack Development. I'm passionate about writing clean, scalable code and building products that provide a great user experience.
            </p>
            <p>
              Right now, my main focus is on expanding my skill set and I am actively <span className="text-white font-medium border-b-2 border-brand-500 pb-1">seeking a MERN Stack internship</span> where I can contribute to real-world projects, learn from experienced engineers, and grow as a developer.
            </p>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-brand-500 rounded-2xl transform translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
            <div className="glass-card p-2 relative z-10 overflow-hidden rounded-2xl h-80 flex items-center justify-center bg-slate-800">
              {/* Fallback avatar if no image is available. In a real scenario we'd use the user's photo */}
              <div className="text-8xl">💻</div>
            </div>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
};

export default About;
