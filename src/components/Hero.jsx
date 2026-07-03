import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, FileDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-scroll';

const ROLES = ["MERN Stack Developer", "Full-Stack Web Developer", "React.js Enthusiast"];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);
    return () => clearInterval(ticker);
  }, [text, isDeleting, delta]);

  const tick = () => {
    let i = roleIndex % ROLES.length;
    let fullText = ROLES[i];
    let updatedText = isDeleting 
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 1.5);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(2000); // pause at the end
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setRoleIndex(roleIndex + 1);
      setDelta(150); // typing speed
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6">
      <div className="text-center w-full max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-brand-500 font-semibold tracking-wider uppercase mb-4"
        >
          Welcome to my portfolio
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Hi, I'm <span className="hero-gradient-text">Amanullah Ibrahim</span>
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-2xl md:text-4xl text-slate-300 font-medium mb-8 h-12"
        >
          <span>I'm a </span>
          <span className="text-white border-r-2 border-brand-500 pr-1 animate-pulse">{text}</span>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          I specialize in building scalable, secure, and dynamic full-stack web applications.
          Passionate about clean code and creating beautiful user experiences.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
        >
          <Link 
            to="projects" 
            smooth={true} 
            duration={500} 
            offset={-80}
            className="cursor-pointer bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-brand-500/50 box-glow"
          >
            View Projects
          </Link>
          <a 
            href="#" 
            className="flex items-center gap-2 glass px-8 py-3 rounded-full text-white font-medium hover:bg-slate-800 transition-colors border border-slate-700"
          >
            <FileDown size={20} />
            Download Resume
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center gap-6"
        >
          <a href="https://github.com/amaan2t3" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-slate-300 hover:text-brand-500 hover:border-brand-500/50 transition-all">
            <FaGithub size={24} />
          </a>
          <a href="https://linkedin.com/in/amanullah-ibrahim-819335329" target="_blank" rel="noopener noreferrer" className="p-3 glass rounded-full text-slate-300 hover:text-brand-500 hover:border-brand-500/50 transition-all">
            <FaLinkedin size={24} />
          </a>
          <a href="mailto:amaanullah9011@gmail.com" className="p-3 glass rounded-full text-slate-300 hover:text-brand-500 hover:border-brand-500/50 transition-all">
            <Mail size={24} />
          </a>
        </motion.div>
      </div>
      </div>
    </section>
  );
};

export default Hero;
