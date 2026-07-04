import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import kiwiImg from '../assets/kiwilogic-intership.png';
import devHubImg from '../assets/DeveloperHub-intership.jpeg';

const experienceData = [
  {
    title: "Web Development Intern",
    company: "Kiwi Logics Labs",
    period: "Jan 2026 – Apr 2026",
    description: "Successfully completed an internship exhibiting professionalism and a positive attitude towards assigned tasks. Found to be punctual, responsible, and eager to learn.",
    side: "left",
    image: kiwiImg
  },
  {
    title: "Front End Development Intern",
    company: "DevelopersHub Corporation",
    period: "Nov 2025 – Dec 2025",
    description: "Successfully completed a six-week virtual internship program with exceptional performance and significant contributions demonstrated throughout the period.",
    side: "right",
    image: devHubImg
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 scroll-mt-0 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="fluid-h2 font-bold text-text-primary mb-16 flex items-center gap-4">
            <span className="text-brand-500">03.</span> Work Experience
            <div className="h-[1px] bg-border-primary flex-grow ml-4"></div>
          </h2>

          <div className="relative">
            {/* Center/Left Timeline Line */}
            <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-border-primary"></div>

            <div className="space-y-12">
              {experienceData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between w-full ${item.side === 'left' ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  {/* Empty space for the other side */}
                  <div className="hidden md:block w-[45%]"></div>

                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 bg-bg-primary border-2 border-brand-500 rounded-full p-2 z-10 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                    <Briefcase className="text-brand-500" size={20} />
                  </div>

                  {/* Content Card */}
                  <div className={`w-full md:w-[45%] pl-14 sm:pl-16 md:pl-0 ${item.side === 'left' ? 'md:pr-10 md:text-right' : 'md:pl-10'
                    }`}>
                    <div className="glass-card p-6 border-b-4 border-b-brand-500 relative group overflow-hidden">
                      <div className="absolute inset-0 bg-brand-500/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-2 relative z-10">{item.title}</h3>
                      <h4 className="text-lg text-brand-500 font-medium mb-3 relative z-10">{item.company}</h4>
                      <div className={`flex flex-wrap gap-2 mb-4 relative z-10 ${item.side === 'left' ? 'md:justify-end' : ''
                        }`}>
                        <span className="inline-block px-3 py-1 bg-glass-bg border border-border-primary text-text-secondary rounded-full text-xs font-mono">
                          {item.period}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm leading-relaxed relative z-10">
                        {item.description}
                      </p>
                      {item.image && (
                        <div className="relative z-10 mt-6 rounded-lg overflow-hidden border border-border-primary bg-bg-secondary">
                          <img src={item.image} alt={`${item.company} certificate`} className="w-full h-48 object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => window.open(item.image, '_blank')} />
                        </div>
                      )}
                    </div>
                  </div>

                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
