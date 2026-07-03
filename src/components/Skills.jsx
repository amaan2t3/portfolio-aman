import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Frontend",
    skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "EJS"]
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Appwrite (BaaS)"]
  },
  {
    title: "Database",
    skills: ["MongoDB"]
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "GitHub", "VS Code", "Postman", "Vercel", "Netlify"]
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 scroll-mt-0">
      <div className="container mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-4">
          <span className="text-brand-500">02.</span> Technical Skills
          <div className="h-[1px] bg-slate-700 flex-grow ml-4"></div>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card p-6"
            >
              <h3 className="text-xl font-semibold text-white mb-6 border-b border-slate-700 pb-2 inline-block">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700 text-slate-300 text-sm hover:border-brand-500/50 hover:text-brand-500 hover:-translate-y-1 transition-all duration-300 cursor-default shadow-md"
                  >
                    {skill}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      </div>
    </section>
  );
};

export default Skills;
