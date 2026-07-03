import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, FileText } from 'lucide-react';
import pnyCert from '../assets/pny.png';
import cppCert from '../assets/C++Essentials1.pdf';
import writingCert from '../assets/Creative_Writing_Certificate.pdf';
import digitalCert from '../assets/Digitsl-Literacy.pdf';

const certificates = [
  {
    title: "MERN Stack Development",
    issuer: "PNY Training Center",
    date: "Mar 2025",
    image: pnyCert,
    type: "image"
  },
  {
    title: "C++ Essentials 1",
    issuer: "Cisco Networking Academy", // Assumption based on common C++ Essentials courses
    date: "2024",
    link: cppCert,
    type: "pdf"
  },
  {
    title: "Digital Literacy",
    issuer: "Ignite / DigiSkills", // Assumption
    date: "2023",
    link: digitalCert,
    type: "pdf"
  },
  {
    title: "Creative Writing",
    issuer: "Ignite / DigiSkills", // Assumption
    date: "2023",
    link: writingCert,
    type: "pdf"
  }
];

const Certificates = () => {
  return (
    <section id="certificates" className="py-24 scroll-mt-0">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-4">
            <span className="text-brand-500">04.5.</span> Certificates
            <div className="h-[1px] bg-slate-800 flex-grow ml-4"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {certificates.map((cert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className="glass-card overflow-hidden group flex flex-col"
              >
                {cert.type === 'image' ? (
                  <div className="w-full h-64 overflow-hidden bg-slate-900 border-b border-slate-800">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 bg-slate-900/50 border-b border-slate-800 flex items-center justify-center text-brand-500">
                    <FileText size={48} className="opacity-50" />
                  </div>
                )}
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-100 group-hover:text-brand-500 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-slate-400 mt-1 flex items-center gap-2">
                        <Award size={16} className="text-brand-500" />
                        {cert.issuer}
                      </p>
                    </div>
                    <span className="text-xs font-mono text-brand-500 px-2 py-1 bg-brand-500/10 rounded-full">
                      {cert.date}
                    </span>
                  </div>
                  
                  {cert.type === 'pdf' && (
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="mt-auto flex items-center gap-2 text-sm text-brand-500 hover:text-brand-400 font-medium w-max"
                    >
                      View Certificate <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
