import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, CheckCircle2, FileDown, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { trackButtonClick, trackSocialClick, trackContactInitiate } from '../utils/analytics';
import { usePortfolio } from '../context/usePortfolio';
import './Hero.css';

const Hero = () => {
  const { data } = usePortfolio();
  const { profile, contact } = data;
  const roles = useMemo(() => profile.roles.length ? profile.roles : ['Developer'], [profile.roles]);
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const roleTimer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 4500);
    return () => window.clearInterval(roleTimer);
  }, [roles.length]);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-content">
        <div className="hero-copy">
          <div className="hero-kicker">
            <span className="hero-kicker-mark"><CheckCircle2 size={15} /></span>
            <span>Full-stack developer / Portfolio 2026</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-strong">Building digital</span>
            <span className="hero-title-serif">experiences that</span>
            <span className="hero-title-accent">move people.</span>
          </h1>

          <p className="hero-intro">
            I&apos;m <strong>{profile.name}</strong>, a <span key={roles[roleIndex]} className="hero-role">{roles[roleIndex]}</span>.
            {' '}{profile.intro}
          </p>

          <div className="hero-actions">
            <Link
              to="/projects"
              onClick={() => trackButtonClick('hero_actions', 'View Projects')}
              className="hero-primary-action"
            >
              Explore my work <ArrowUpRight size={17} />
            </Link>
            <Link
              to="/about"
              onClick={() => trackButtonClick('hero_actions', 'About Me')}
              className="hero-secondary-action"
            >
              About me
            </Link>
          </div>

          <div className="hero-bottom">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('hero_actions', 'Download Resume')}
              className="hero-resume-link"
            >
              <FileDown size={15} /> Download resume
            </a>
            <a href={`mailto:${contact.email}`} onClick={() => trackContactInitiate('Hero Email Link')} className="hero-email">
              <Mail size={15} /> {contact.email}
            </a>
            <div className="hero-socials" aria-label="Social profiles">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" onClick={() => trackSocialClick('GitHub')}><FaGithub /></a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" onClick={() => trackSocialClick('LinkedIn')}><FaLinkedin /></a>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-portrait-backplate" />
          <div className="hero-portrait-frame">
            <img src={data.about.image} alt={profile.name} fetchPriority="high" decoding="async" />
            <div className="hero-portrait-shade" />
            <div className="hero-portrait-caption">
              <span>Based in</span>
              <strong>{contact.location}</strong>
            </div>
          </div>
          <div className="hero-profile-card">
            <span className="hero-profile-card-icon"><CheckCircle2 size={17} /></span>
            <div>
              <strong>Thoughtful by design.</strong>
              <span>Built for people, made to last.</span>
            </div>
          </div>
          <div className="hero-photo-note">
            <span>MY APPROACH</span>
            <strong>Good ideas, carefully built.</strong>
          </div>
        </div>
      </div>

      <a className="hero-scroll-hint" href="#about" aria-label="Scroll to about section">
        <span>Scroll to explore</span><ArrowDown size={15} />
      </a>
    </section>
  );
};

export default Hero;
