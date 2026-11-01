import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { trackProjectClick } from '../utils/analytics';
import { usePortfolio } from '../context/usePortfolio';

const Projects = () => {
  const { data: { projects } } = usePortfolio();

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
            {projects.map((project) => (
              <motion.div
                key={project.title}
                whileHover={{ y: -5 }}
                className="bg-glass-bg backdrop-blur-md border border-border-primary hover:border-brand-500/50 rounded-2xl flex flex-col h-full group overflow-hidden transition-all duration-300"
              >
                <div className="w-full aspect-video bg-bg-secondary relative overflow-hidden flex items-center justify-center border-b border-border-primary">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    />
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
                    {project.tech.map((tech) => (
                      <span key={tech} className="bg-glass-bg border border-border-primary text-xs text-text-secondary rounded-md px-3 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-border-primary">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={() => trackProjectClick('Source Code', project.title)} className="flex items-center gap-2 text-sm text-text-secondary hover:text-brand-500 transition-colors bg-glass-bg px-4 py-2 rounded-lg border border-border-primary hover:border-brand-500/30">
                        <FaGithub size={16} /> Code
                      </a>
                    )}
                    {project.live && project.live !== "#" && (
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
