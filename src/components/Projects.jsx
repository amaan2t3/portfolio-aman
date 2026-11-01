import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Folder } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { trackProjectClick } from '../utils/analytics';
import { usePortfolio } from '../context/usePortfolio';
import './Projects.css';

const Projects = () => {
  const { data: { projects } } = usePortfolio();

  return (
    <section id="projects" className="projects-section py-24 scroll-mt-0 transition-colors duration-300">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="max-w-6xl mx-auto"
        >
          <div className="projects-heading">
            <div>
              <span className="projects-kicker">Selected work / 2024—2026</span>
              <h2 className="fluid-h2 font-bold text-text-primary">Projects<span>.</span></h2>
            </div>
            <p>A collection of products and experiments built to solve real problems and create thoughtful digital experiences.</p>
            <span className="projects-count">{String(projects.length).padStart(2, '0')} <span>projects</span></span>
          </div>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                whileHover={{ y: -6 }}
                className="project-card group"
              >
                <div className="project-card-image">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="project-image"
                    />
                  ) : (
                    <div className="project-image-placeholder"><Folder size={42} /></div>
                  )}
                  <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
                  <div className="project-image-actions">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`} onClick={() => trackProjectClick('Source Code', project.title)}>
                        <FaGithub size={17} />
                      </a>
                    )}
                    {project.live && project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live demo`} onClick={() => trackProjectClick('Live Demo', project.title)}>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                <div className="project-card-content">
                  <div className="project-card-title-row">
                    <h3>{project.title}</h3>
                    {project.live && project.live !== '#' && <span className="project-live-indicator"><span /> Live</span>}
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-tech-list" aria-label="Technologies used">
                    {project.tech.map((tech) => <span key={tech}>{tech}</span>)}
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
