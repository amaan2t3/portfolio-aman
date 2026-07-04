import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import blogImg from '../assets/blogwebapp.png';
import gymImg from '../assets/GYM.png';
import currencyImg from '../assets/currency-converter.png';
import bgChangerImg from '../assets/bg-changer.png';
import smartWatchImg from '../assets/smart-watch.png';

const projects = [
  {
    title: "Full-Stack Blog Web Application",
    description: "A comprehensive blog platform allowing users to create, read, update, and delete posts with image upload capabilities and secure JWT authentication.",
    tech: ["React.js", "Node.js", "Appwrite", "JWT", "Tailwind CSS"],
    github: "https://github.com/amaan2t3",
    live: "https://blog-app-five-psi-40.vercel.app",
    image: blogImg
  },
  {
    title: "Gym & Fitness Website",
    description: "A modern, responsive fitness platform featuring a BMI calculator, dynamic exercise lists, and a sleek user interface for gym enthusiasts.",
    tech: ["React.js", "Tailwind CSS"],
    github: "https://github.com/amaan2t3",
    live: "https://gym-fitness-amaan.netlify.app",
    image: gymImg
  },
  {
    title: "Currency Converter",
    description: "A real-time currency conversion application fetching live exchange rates to provide accurate monetary conversions globally.",
    tech: ["React.js", "API Integration", "Tailwind CSS"],
    github: "https://github.com/amaan2t3",
    live: "https://currency-converter-amaan.netlify.app/",
    image: currencyImg
  },
  {
    title: "Background Changer",
    description: "An interactive utility application that dynamically alters the background color of the interface based on user interaction.",
    tech: ["React.js", "Tailwind CSS", "State Management"],
    github: "https://github.com/amaan2t3",
    live: "https://bg-changer-amaan.netlify.app/",
    image: bgChangerImg
  },
  {
    title: "Smartwatch UI Design",
    description: "A sleek, interactive user interface mockup for a smartwatch application demonstrating modern frontend design principles and animations.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: "https://github.com/amaan2t3",
    live: "https://smartwatch-ui-amaan.netlify.app/",
    image: smartWatchImg
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
          <span className="text-brand-500">04.</span> Featured Projects
          <div className="h-[1px] bg-slate-700 flex-grow ml-4"></div>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-[rgba(255,255,255,0.02)] backdrop-blur-md border border-white/5 hover:border-brand-500/50 rounded-2xl flex flex-col h-full group overflow-hidden transition-all duration-300"
            >
              <div className="w-full aspect-video bg-[#0d121c] relative overflow-hidden flex items-center justify-center border-b border-white/5">
                 {project.image ? (
                   <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                 ) : (
                   <Folder size={48} className="text-brand-500/20" />
                 )}
              </div>
              <div className="p-6 flex flex-col h-full">
                <h3 className="text-xl font-bold text-slate-200 mb-3 group-hover:text-brand-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="bg-white/5 border border-white/10 text-xs text-slate-300 rounded-md px-3 py-1">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto pt-4 border-t border-white/5">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-500 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-brand-500/30">
                    <FaGithub size={16} /> Code
                  </a>
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-500 transition-colors bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-brand-500/30">
                      <ExternalLink size={16} /> Live Demo
                    </a>
                  )}
                </div>
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
