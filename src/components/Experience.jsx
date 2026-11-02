import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { usePortfolio } from '../context/usePortfolio';

const Experience = () => {
  const { data: { experience: experienceData } } = usePortfolio();

  return (
    <section id="experience" className="relative py-24 scroll-mt-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(38,115,77,0.10),transparent_48%)]" />

      <div className="container relative mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-10 grid items-end gap-5 md:mb-12 md:grid-cols-[minmax(0,1fr)_minmax(220px,360px)_auto]">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.17em] text-brand-500">Career / 03</span>
              <h2 className="fluid-h2 mt-2 font-bold text-text-primary">Work Experience<span className="text-brand-500">.</span></h2>
            </div>
            <p className="max-w-sm text-[length:var(--type-section-description)] leading-7 text-text-secondary">
              A record of hands-on work, collaboration, and continued growth as a developer.
            </p>
            <span className="flex items-baseline gap-2 text-2xl font-bold tracking-tight text-text-primary">
              {String(experienceData.length).padStart(2, '0')}
              <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-text-secondary">roles</span>
            </span>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-brand-500/0 via-brand-500/50 to-brand-500/0 md:left-1/2" />

            <div className="space-y-10 md:space-y-16">
              {experienceData.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className={`relative flex flex-col md:flex-row md:items-center ${item.side === 'left' ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="hidden md:block md:w-[45%]" />

                  <div className="absolute left-4 top-6 z-10 -translate-x-1/2 rounded-full border-2 border-brand-500 bg-bg-primary p-2.5 shadow-[0_0_16px_rgba(38,115,77,0.32)] md:left-1/2 md:top-1/2 md:-translate-y-1/2">
                    <Briefcase className="text-brand-500" size={18} />
                  </div>

                  <div className={`w-full md:w-[45%] pl-14 sm:pl-16 md:pl-0 ${item.side === 'left' ? 'md:pr-10 md:text-right' : 'md:pl-10'}`}>
                    <div className="glass-card group relative overflow-hidden border border-border-primary/80 p-5 shadow-[0_20px_60px_rgba(32,40,32,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/60 hover:shadow-[0_25px_70px_rgba(38,115,77,0.12)] sm:p-7">
                      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 via-brand-500/70 to-brand-600" />
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 via-transparent to-brand-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      <div className="relative z-10">
                        <div className={`mb-4 flex flex-wrap items-center gap-3 ${item.side === 'left' ? 'md:justify-end' : ''}`}>
                          <span className="inline-flex items-center rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-500">
                            Experience
                          </span>
                          <span className="inline-flex items-center rounded-full border border-border-primary bg-bg-primary/70 px-3 py-1 text-xs font-medium text-text-secondary">
                            {item.period}
                          </span>
                        </div>

                        <h3 className="mb-2 text-xl font-bold text-text-primary md:text-2xl">{item.title}</h3>
                        <h4 className="mb-4 text-base font-semibold text-brand-500 md:text-lg">{item.company}</h4>

                        <p className="text-[length:var(--type-body)] leading-relaxed text-text-secondary">
                          {item.description}
                        </p>

                        {item.image && (
                          <div className="mt-6 overflow-hidden rounded-2xl border border-border-primary bg-bg-secondary">
                            <a href={item.image} target="_blank" rel="noopener noreferrer" aria-label={`View ${item.company} experience image`}>
                              <img
                                src={item.image}
                                alt={`${item.company} experience`}
                                loading="lazy"
                                decoding="async"
                                className="h-44 w-full object-cover opacity-90 transition duration-300 hover:scale-[1.02] hover:opacity-100 sm:h-52"
                              />
                            </a>
                          </div>
                        )}
                      </div>
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
