// js/main.js
import { renderProjects, renderSkills, renderExperience } from './components.js';

document.addEventListener('DOMContentLoaded', () => {
  // Render dynamic components
  renderProjects();
  renderSkills();
  renderExperience();

  // Remove Loader
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1000);

  // Theme Toggle
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  
  if (savedTheme === 'light' || (!savedTheme && systemPrefersLight)) {
    html.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '🌙'; // Icon for dark mode switch
  } else {
    html.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '☀️'; // Icon for light mode switch
  }

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '🌙';
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '☀️';
    }
  });

  // Mobile Menu
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close mobile menu on link click
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // Scroll Progress and Navbar Background
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.getElementById('scroll-progress');

  window.addEventListener('scroll', () => {
    // Navbar styling
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
  });

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Trigger on load

  // Animated Counters
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200; // The lower the slower

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(animateCounters, 1);
      } else {
        counter.innerText = target + (counter.getAttribute('data-plus') ? '+' : '');
      }
    });
  };

  // Trigger counters when About section is reached
  const aboutSection = document.getElementById('about');
  let countersStarted = false;

  window.addEventListener('scroll', () => {
    if (!countersStarted && aboutSection.getBoundingClientRect().top < window.innerHeight - 100) {
      countersStarted = true;
      animateCounters();
    }
  });
});
