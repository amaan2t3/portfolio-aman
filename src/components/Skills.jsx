import { motion } from 'framer-motion';
import { Code, Monitor, Wrench } from 'lucide-react';
import { usePortfolio } from '../context/usePortfolio';
import './Skills.css';

const SkillItem = ({ skill }) => (
  <motion.div
    whileHover={{ y: -3 }}
    className="skill-item"
  >
    <div className="skill-item-icon">
      <img
        src={skill.icon}
        alt={skill.name}
        loading="lazy"
        decoding="async"
        className={`skill-icon-image ${skill.invert ? 'is-inverted' : ''}`}
      />
    </div>
    <span className="skill-item-name">{skill.name}</span>
    <span className="skill-item-arrow" aria-hidden="true">↗</span>
  </motion.div>
);

const Skills = () => {
  const { data: { skills: categories } } = usePortfolio();
  const icons = { monitor: Monitor, code: Code, tools: Wrench };

  return (
    <section id="skills" className="skills-section py-24 scroll-mt-0 relative overflow-hidden transition-colors duration-300">
      <div className="container mx-auto px-6 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="skills-heading">
            <div><span className="skills-kicker">Capabilities / Toolkit</span><h2 className="fluid-h2">Technical skills<span>.</span></h2></div>
            <p>The tools I use to turn ideas into reliable, intuitive digital products.</p>
            <span className="skills-category-count">{String(categories.length).padStart(2, '0')} <span>focus areas</span></span>
          </div>

          <div className="skills-grid">
            {categories.map((category, idx) => {
              const CategoryIcon = icons[category.icon] || Code;
              return (
                <motion.article
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.08 }}
                  className="skill-category-card"
                >
                  <header className="skill-category-header">
                    <span className="skill-category-icon"><CategoryIcon size={20} /></span>
                    <div className="skill-category-heading">
                      <span className="skill-category-index">0{idx + 1} / AREA</span>
                      <h3>{category.title}</h3>
                    </div>
                    <span className="skill-category-total">{String(category.skills.length).padStart(2, '0')}</span>
                  </header>
                  <div className="skill-category-divider" />
                  <div className="skill-items-grid">
                    {category.skills.map((skill, i) => <SkillItem key={`${skill.name}-${i}`} skill={skill} />)}
                  </div>
                  <footer className="skill-category-footer">
                    <span>TOOLS & TECHNOLOGIES</span><span className="skill-category-footer-mark">✳</span>
                  </footer>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
