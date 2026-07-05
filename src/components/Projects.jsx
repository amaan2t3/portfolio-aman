import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { trackProjectClick } from '../utils/analytics';
import blogImg from '../assets/blogwebapp.png';
import gymImg from '../assets/GYM.png';
import currencyImg from '../assets/currency-converter.png';
import bgChangerImg from '../assets/bg-changer.png';
import smartWatchImg from '../assets/smart-watch.png';

const projects = [
  {
    title: "Full-Stack Blog Web Application",
    description: "A comprehensive blog platform allowing users to create, read, update, and delete posts with image upload capabilities and secure JWT authentication.",
    tech: ["JavaScript", "React.js", "Node.js", "API Integration", "Appwrite", "JWT", "Tailwind CSS"],
    github: "https://github.com/amaan2t3",
    live: "https://blog-app-five-psi-40.vercel.app",
    image: blogImg
  },
  {
    title: "Gym & Fitness Website",
    description: "A modern, responsive fitness platform featuring a BMI calculator, dynamic exercise lists, and a sleek user interface for gym enthusiasts.",
    tech: ["JavaScript", "React.js", "Node.js", "Tailwind CSS"],
    github: "https://github.com/amaan2t3",
    live: "https://gym-fitness-amaan.netlify.app",
    image: gymImg
  },
  {
    title: "Currency Converter",
    description: "A real-time currency conversion application fetching live exchange rates to provide accurate monetary conversions globally.",
    tech: ["JavaScript", "React.js", "API Integration", "Tailwind CSS", "Node.js",],
    github: "https://github.com/amaan2t3",
    live: "https://currency-converter-amaan.netlify.app/",
    image: currencyImg
  },
  {
    title: "Background Changer",
    description: "An interactive utility application that dynamically alters the background color of the interface based on user interaction.",
    tech: ["JavaScript", "React.js", "Tailwind CSS", "State Management"],
    github: "https://github.com/amaan2t3",
    live: "https://bg-changer-amaan.netlify.app/",
    image: bgChangerImg
  },
  {
    title: "Smartwatch UI Design",
    description: "A sleek, interactive user interface mockup for a smartwatch application demonstrating modern frontend design principles and animations.",
    tech: ["HTML5", "React.js", "Tailwind CSS", "JavaScript", "Node.js", "API Integration",],
    github: "https://github.com/amaan2t3",
    live: "https://smartwatch-ui-amaan.netlify.app/",
    image: smartWatchImg
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 scroll-mt-0 bg-bg-secondary transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="fluid-h2 font-bold text-text-primary mb-12 flex items-center gap-4">
            <span className="text-brand-500">04.</span> Featured Projects
            <div className="h-[1px] bg-border-primary flex-grow ml-4"></div>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="bg-glass-bg backdrop-blur-md border border-border-primary hover:border-brand-500/50 rounded-2xl flex flex-col h-full group overflow-hidden transition-all duration-300"
              >
                <div className="w-full aspect-video bg-bg-secondary relative overflow-hidden flex items-center justify-center border-b border-border-primary">
                  {project.image ? (
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  ) : (
                    <Folder size={48} className="text-brand-500/20" />
                  )}
                </div>
                <div className="p-6 flex flex-col h-full">
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-brand-500 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-grow">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="bg-glass-bg border border-border-primary text-xs text-text-secondary rounded-md px-3 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-border-primary">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={() => trackProjectClick('Source Code', project.title)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-500 transition-colors bg-glass-bg px-4 py-2 rounded-lg border border-border-primary hover:border-brand-500/30">
                      <FaGithub size={16} /> Code
                    </a>
                    {project.live !== "#" && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={() => trackProjectClick('Live Demo', project.title)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-500 transition-colors bg-glass-bg px-4 py-2 rounded-lg border border-border-primary hover:border-brand-500/30">
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
