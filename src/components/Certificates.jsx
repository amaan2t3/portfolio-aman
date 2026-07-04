import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Award, FileText } from 'lucide-react';
import pnyCert from '../assets/pny.png';
import cppCert from '../assets/C++Essentials1.pdf';
import cppCertImg from '../assets/C++.png';
import writingCert from '../assets/Creative_Writing_Certificate.pdf';
import writingCertImg from '../assets/writing.png';
import digitalCert from '../assets/Digitsl-Literacy.pdf';
import digitalCertImg from '../assets/digital.png';

const certificates = [
  {
    title: "MERN Stack Development",
    issuer: "PNY Training Center",
    date: "September 2025",
    image: pnyCert,
    type: "image"
  },
  {
    title: "C++ Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Jun 2026",
    image: cppCertImg,
    link: cppCert,
    type: "image"
  },
  {
    title: "Digital Literacy",
    issuer: "Ignite / DigiSkills", // Assumption
    date: "2026",
    image: digitalCertImg,
    link: digitalCert,
    type: "image"
  },
  {
    title: "Creative Writing",
    issuer: "Ignite / DigiSkills", // Assumption
    date: "April 2026",
    image: writingCertImg,
    link: writingCert,
    type: "image"
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 flex items-center gap-4">
            <span className="text-brand-500">06.</span> Certifications
            <div className="h-[1px] bg-slate-700 flex-grow ml-4"></div>
          </h2>

          <div className="relative">
            {/* Center Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-[2px] bg-white/10"></div>

            <div className="space-y-12">
              {certificates.map((cert, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className={`relative flex flex-col md:flex-row items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                >
                  <div className="hidden md:block w-[45%]"></div>

                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 bg-[#0A0E17] border border-brand-500/50 rounded-full p-2 z-10 shadow-[0_0_15px_rgba(16,185,129,0.3)] bg-white/5 backdrop-blur-sm">
                    <Award className="text-brand-500" size={20} />
                  </div>

                  <div className={`w-full md:w-[45%] pl-10 md:pl-0 ${idx % 2 === 0 ? 'md:pr-10' : 'md:pl-10'
                    }`}>
                    <div className="bg-[rgba(255,255,255,0.02)] backdrop-blur-md border border-white/5 hover:border-brand-500/50 rounded-2xl overflow-hidden group flex flex-col transition-all duration-300">
                      {cert.type === 'image' ? (
                        <div className="w-full h-48 overflow-hidden bg-[#0d121c] border-b border-white/5">
                          <img
                            src={cert.image}
                            alt={cert.title}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                            onClick={() => window.open(cert.image, '_blank')}
                          />
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-[#0d121c] border-b border-white/5 flex items-center justify-center text-brand-500">
                          <FileText size={48} className="opacity-50" />
                        </div>
                      )}

                      <div className="p-6 flex flex-col flex-grow">
                        <div className={`flex flex-col mb-4 ${idx % 2 === 0 ? 'md:items-end md:text-right' : ''}`}>
                          <h3 className="text-xl font-bold text-slate-100 group-hover:text-brand-500 transition-colors">
                            {cert.title}
                          </h3>
                          <p className={`text-slate-400 mt-1 flex items-center gap-2 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                            <Award size={16} className="text-brand-500" />
                            {cert.issuer}
                          </p>
                          <span className="text-xs font-mono text-slate-300 px-3 py-1 bg-white/5 border border-white/10 rounded-md mt-3 w-max">
                            {cert.date}
                          </span>
                        </div>

                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`mt-auto flex items-center gap-2 text-sm text-slate-400 hover:text-brand-500 font-medium w-max bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-brand-500/30 ${idx % 2 === 0 ? 'md:ml-auto' : ''}`}
                          >
                            View Certificate <ExternalLink size={16} />
                          </a>
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

export default Certificates;
