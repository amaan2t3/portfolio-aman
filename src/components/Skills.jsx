import React from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, Wrench } from 'lucide-react';
import { usePortfolio } from '../context/usePortfolio';

const SkillItem = ({ skill }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-glass-bg border border-border-primary hover:border-brand-500/50 rounded-lg p-3 flex items-center gap-3 transition-colors"
  >
    <div className="w-5 h-5 flex items-center justify-center">
      <img
        src={skill.icon}
        alt={skill.name}
        loading="lazy"
        decoding="async"
        className={`max-w-full max-h-full object-contain ${skill.invert ? 'filter invert brightness-0' : ''}`}
      />
    </div>
    <span className="text-sm font-medium text-text-primary whitespace-nowrap">{skill.name}</span>
  </motion.div>
);

const Skills = () => {
  const { data: { skills: categories } } = usePortfolio();
  const icons = { monitor: Monitor, code: Code, tools: Wrench };

  return (
    <section id="skills" className="py-24 scroll-mt-0 relative overflow-hidden bg-bg-primary transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">

        <h2 className="fluid-h2 font-bold text-text-primary mb-12 flex items-center gap-4">
          <span className="text-brand-500">02.</span> Technical Skills
          <div className="h-[1px] bg-border-primary flex-grow ml-4"></div>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            {categories.map((category, idx) => (
              <div key={idx} className="bg-glass-bg border border-border-primary backdrop-blur-md rounded-2xl p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-3">
                   {React.createElement(icons[category.icon] || Code, { size: 20, className: 'text-brand-500' })}
                   {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {category.skills.map((skill, i) => (
                    <SkillItem key={i} skill={skill} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
