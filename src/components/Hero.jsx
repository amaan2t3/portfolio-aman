import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Mail, FileDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { trackButtonClick, trackSocialClick, trackContactInitiate } from '../utils/analytics';
import { usePortfolio } from '../context/usePortfolio';

const Hero = () => {
  const { data: { profile, contact } } = usePortfolio();
  const roles = useMemo(() => profile.roles.length ? profile.roles : ['Developer'], [profile.roles]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState(roles[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(150);

  const tick = useCallback(() => {
    let i = roleIndex % roles.length;
    let fullText = roles[i];
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
  }, [isDeleting, roles, roleIndex, text]);

  useEffect(() => {
    const ticker = setInterval(tick, delta);
    return () => clearInterval(ticker);
  }, [delta, tick]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6">
        <div className="text-center w-full max-w-4xl mx-auto">
          <p className="text-brand-500 font-semibold tracking-wider uppercase mb-4">
            Welcome to my portfolio
          </p>

          <h1 className="fluid-h1 font-extrabold mb-4 md:mb-6 tracking-tighter">
            Hi, I'm <span className="hero-gradient-text">{profile.name}</span>
          </h1>

          <div className="fluid-h3 text-text-primary font-bold mb-8 min-h-[3rem] md:min-h-[4rem] tracking-tight">
            <span>I'm a </span>
            <span className="text-text-primary border-r-2 border-brand-500 pr-1 animate-pulse">{text}</span>
          </div>

          <p className="fluid-p text-text-secondary mb-10 max-w-2xl mx-auto px-2 md:px-0">
            {profile.intro}
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 mb-12">
            <Link
              to="/projects"
              onClick={() => trackButtonClick('hero_actions', 'View Projects')}
              className="cursor-pointer w-full sm:w-auto flex justify-center bg-brand-600 hover:bg-brand-500 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-brand-500/50 box-glow"
            >
              View Projects
            </Link>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('hero_actions', 'Download Resume')}
              className="flex items-center justify-center w-full sm:w-auto gap-2 bg-glass-bg px-8 py-3 rounded-full text-text-primary font-semibold hover:border-brand-500 transition-colors border border-border-primary backdrop-blur-sm"
            >
              <FileDown size={20} />
              Resume
            </a>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 mb-16">
            <div className="text-text-secondary font-mono text-sm flex items-center gap-2">
              <span className="text-brand-500">▲</span> ~ {contact.email}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8 border-t border-border-primary">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" onClick={() => trackSocialClick('GitHub')} className="flex flex-col items-center group cursor-pointer">
              <FaGithub size={24} className="text-text-secondary mb-3 group-hover:text-brand-500 transition-colors" />
              <span className="text-xl md:text-2xl font-bold text-text-primary mb-1 group-hover:text-brand-500 transition-colors">{profile.githubCount}</span>
              <span className="text-xs md:text-sm text-text-secondary text-center">GitHub Projects</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => trackSocialClick('LinkedIn')} className="flex flex-col items-center group cursor-pointer">
              <FaLinkedin size={24} className="text-text-secondary mb-3 group-hover:text-brand-500 transition-colors" />
              <span className="text-xl md:text-2xl font-bold text-text-primary mb-1 group-hover:text-brand-500 transition-colors">{profile.linkedinCount}</span>
              <span className="text-xs md:text-sm text-text-secondary text-center">LinkedIn Connections</span>
            </a>
            <a href={`mailto:${contact.email}`} onClick={() => trackContactInitiate('Hero Email Link')} className="flex flex-col items-center group cursor-pointer">
              <Mail size={24} className="text-text-secondary mb-3 group-hover:text-brand-500 transition-colors" />
              <span className="text-xl md:text-2xl font-bold text-text-primary mb-1 group-hover:text-brand-500 transition-colors">24×7</span>
              <span className="text-xs md:text-sm text-text-secondary text-center">Email Me</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
