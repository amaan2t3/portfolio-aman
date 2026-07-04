import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';
import vuImg from '../assets/virtualUniversity.jpg';
import pnyImg from '../assets/PNY.png';
import aqImg from '../assets/Aqcollege.jpg';
import cppImg from '../assets/cisco-logo.png';

const educationData = [
  {
    degree: "BS Computer Science",
    institution: "Virtual University of Pakistan",
    period: "2025 – Present",
    icon: <GraduationCap className="text-brand-500" size={24} />,
    image: vuImg
  },
  {
    degree: "Intermediate (ICS)",
    institution: "Dr. A.Q. Khan School & College",
    period: "2022 – 2024",
    icon: <BookOpen className="text-brand-500" size={24} />,
    image: aqImg
  },
  {
    degree: "MERN Stack Development Certification",
    institution: "PNY Training Center",
    period: "Mar 2025",
    icon: <Award className="text-brand-500" size={24} />,
    image: pnyImg
  },

  {
    degree: "C++ Essentials 1",
    institution: "Cisco Networking Academy",
    period: "Jun 2026",
    icon: <Award className="text-brand-500" size={24} />,
    image: cppImg
  }
];

const Education = () => {
  return (
    <section id="education" className="py-24 scroll-mt-0">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="fluid-h2 font-bold text-text-primary mb-12 flex items-center gap-4">
            <span className="text-brand-500">05.</span> Education
            <div className="h-[1px] bg-border-primary flex-grow ml-4"></div>
          </h2>

          <div className="relative border-l border-border-primary ml-4 md:ml-6 space-y-12">
            {educationData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative pl-10 md:pl-12"
              >
                <div className="absolute -left-5 top-0 bg-bg-primary border-2 border-brand-500 rounded-full p-1.5 shadow-[0_0_10px_rgba(14,165,233,0.5)]">
                  {item.icon}
                </div>

                <div className="glass-card p-6 border-l-4 border-l-brand-500 flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-1">{item.degree}</h3>
                    <h4 className="text-lg text-text-secondary mb-2">{item.institution}</h4>
                    <span className="inline-block px-3 py-1 bg-brand-500/10 text-brand-500 rounded-full text-sm font-mono">
                      {item.period}
                    </span>
                  </div>
                  {item.image && (
                    <div className="w-full md:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden bg-glass-bg border border-border-primary flex items-center justify-center">
                      <img src={item.image} alt={item.institution} className="w-full h-full object-cover opacity-90" />
                    </div>
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

export default Education;
