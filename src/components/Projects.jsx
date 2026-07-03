import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: "Full-Stack Blog Web Application",
    description: "A comprehensive blog platform allowing users to create, read, update, and delete posts with image upload capabilities and secure JWT authentication.",
    tech: ["React.js", "Node.js", "Appwrite", "JWT", "Tailwind CSS"],
    github: "https://github.com/amaan2t3",
    live: "https://blog-app-five-psi-40.vercel.app"
  },
  {
    title: "Gym & Fitness Website",
    description: "A modern, responsive fitness platform featuring a BMI calculator, dynamic exercise lists, and a sleek user interface for gym enthusiasts.",
    tech: ["React.js", "Tailwind CSS"],
    github: "https://github.com/amaan2t3",
    live: "https://gym-fitness-amaan.netlify.app"
  },
  {
    title: "Mini JavaScript Projects",
    description: "A collection of interactive mini-projects demonstrating core JavaScript concepts: Digital Clock, Background Color Changer, Number Guessing Game, and Keyboard Checker.",
    tech: ["JavaScript (ES6+)", "HTML5", "CSS3"],
    github: "https://github.com/amaan2t3",
    live: "#"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 scroll-mt-0 bg-[#0F172A]">
      <div className="container mx-auto px-6">
        <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-4">
          <span className="text-brand-500">03.</span> Featured Projects
          <div className="h-[1px] bg-slate-700 flex-grow ml-4"></div>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -10 }}
              className="glass-card p-6 flex flex-col h-full group"
            >
              <div className="flex justify-between items-center mb-6">
                <Folder size={40} className="text-brand-500 stroke-1" />
                <div className="flex gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-500 transition-colors">
                    <FaGithub size={20} />
                  </a>
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-500 transition-colors">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-brand-500 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-700/50">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs font-mono text-brand-500">
                    {tech}
                  </span>
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

export default Projects;
