import { useEffect, useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, CheckCircle2, FileDown, Mail } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { trackButtonClick, trackSocialClick, trackContactInitiate } from '../utils/analytics';
import { usePortfolio } from '../context/usePortfolio';
import './Hero.css';

const Hero = () => {
  const { data } = usePortfolio();
  const { profile, contact } = data;
  const roles = useMemo(() => profile.roles.length ? profile.roles : ['Developer'], [profile.roles]);
  const backgroundImages = useMemo(() => {
    const projectImages = data.projects.map((project) => project.image).filter(Boolean);
    return [...new Set(projectImages)].slice(0, 5);
  }, [data.projects]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const roleTimer = window.setInterval(() => {
      setRoleIndex((current) => (current + 1) % roles.length);
    }, 3500);
    return () => window.clearInterval(roleTimer);
  }, [roles.length]);

  useEffect(() => {
    if (backgroundImages.length < 2) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const imageTimer = window.setInterval(() => {
      setBackgroundIndex((current) => (current + 1) % backgroundImages.length);
    }, 1000);
    return () => window.clearInterval(imageTimer);
  }, [backgroundImages.length]);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-backdrops" aria-hidden="true">
        {backgroundImages.map((image, index) => (
          <div
            className={`hero-backdrop ${index === backgroundIndex ? 'is-visible' : ''}`}
            key={image}
            style={{ backgroundImage: `url("${image}")` }}
          />
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-copy">
          <div className="hero-availability"><span className="hero-availability-dot" /> Open to new opportunities</div>
          <p className="hero-eyebrow">Portfolio / 2026</p>
          <h1 className="hero-title">
            Building digital
            <span>experiences that</span>
            <span className="hero-title-accent">move people.</span>
          </h1>
          <p className="hero-intro">
            I&apos;m <strong>{profile.name}</strong>, a <span key={roles[roleIndex]} className="hero-role">{roles[roleIndex]}</span>.{' '}
            {profile.intro}
          </p>

          <div className="hero-actions">
            <Link
              to="/projects"
              onClick={() => trackButtonClick('hero_actions', 'View Projects')}
              className="hero-primary-action"
            >
              Explore my work <ArrowUpRight size={17} />
            </Link>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackButtonClick('hero_actions', 'Download Resume')}
              className="hero-secondary-action"
            >
              <FileDown size={17} /> Download resume
            </a>
          </div>

          <div className="hero-bottom">
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
          <div className="hero-portrait-frame">
            <img src={data.about.image} alt={profile.name} fetchPriority="high" decoding="async" />
            <div className="hero-portrait-shade" />
            <div className="hero-portrait-caption">
              <span>Based in</span>
              <strong>{contact.location}</strong>
            </div>
          </div>
          <div className="hero-profile-card">
            <CheckCircle2 size={17} />
            <div><strong>Thoughtful by design.</strong><span>Built for people, made to last.</span></div>
          </div>
          <div className="hero-social-proof">
            <div><strong>{profile.githubCount}</strong><span>Projects</span></div>
            <div><strong>{profile.linkedinCount}</strong><span>Connections</span></div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint"><ArrowDownRight size={15} /> Scroll to explore</div>
      <div className="hero-image-indicator" aria-hidden="true">
        {backgroundImages.map((image, index) => (
          <span className={index === backgroundIndex ? 'is-active' : ''} key={image} />
        ))}
      </div>
    </section>
  );
};

export default Hero;
