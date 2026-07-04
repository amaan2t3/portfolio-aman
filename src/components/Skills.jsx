import React from 'react';
import { motion } from 'framer-motion';
import { Code, Monitor, Wrench } from 'lucide-react';

const mainSkills = [
  { name: 'HTML 5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS 3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'React JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Redux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg' },
  { name: 'Material UI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg' },
  { name: 'Scss', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg' },
  { name: 'Node JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
];

const secondarySkills = [
  { name: 'Express JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg', invert: true },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'Mongoose', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg', invert: true },
];

const toolsSkills = [
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg' },
  { name: 'ChatGPT', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
  { name: 'Chrome', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg' },
  { name: 'MongoDB Compass', icon: 'https://img.icons8.com/color/144/mongodb.png' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
  { name: 'Ubuntu', icon: 'https://img.icons8.com/color/144/ubuntu--v1.png' },
];

const CATEGORIES = [
  { title: "Front-End Development", icon: Monitor, skills: mainSkills },
  { title: "Back-End & Version Control", icon: Code, skills: secondarySkills },
  { title: "Tools & Platforms", icon: Wrench, skills: toolsSkills }
];

const SkillItem = ({ skill }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="bg-glass-bg border border-border-primary hover:border-brand-500/50 rounded-lg p-3 flex items-center gap-3 transition-colors"
  >
    <div className="w-5 h-5 flex items-center justify-center">
      <img
        src={skill.icon}
        alt={skill.name}
        className={`max-w-full max-h-full object-contain ${skill.invert ? 'filter invert brightness-0' : ''}`}
      />
    </div>
    <span className="text-sm font-medium text-text-primary whitespace-nowrap">{skill.name}</span>
  </motion.div>
);

const Skills = () => {
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
            {CATEGORIES.map((category, idx) => (
              <div key={idx} className="bg-glass-bg border border-border-primary backdrop-blur-md rounded-2xl p-6 flex flex-col h-full">
                <h3 className="text-lg font-semibold text-text-primary mb-6 flex items-center gap-3">
                   <category.icon size={20} className="text-brand-500" />
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
