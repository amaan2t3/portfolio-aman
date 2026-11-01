import cvFile from '../assets/Amanullah_Ibrahim_CV.pdf';
import aqImage from '../assets/optimized/Aqcollege.webp';
import ciscoImage from '../assets/optimized/cisco-logo.webp';
import cppCertificate from '../assets/C++Essentials1.pdf';
import cppImage from '../assets/optimized/C++.webp';
import digitalCertificate from '../assets/Digitsl-Literacy.pdf';
import digitalImage from '../assets/optimized/digital.webp';
import devHubImage from '../assets/optimized/DeveloperHub-intership.webp';
import futsalImage from '../assets/optimized/futsal.webp';
import gymImage from '../assets/optimized/GYM.webp';
import blogImage from '../assets/optimized/blogwebapp.webp';
import kiwiImage from '../assets/optimized/kiwilogic-intership.webp';
import nsuImage from '../assets/optimized/Nsu-mukhtar-auditorium.webp';
import pnyCertificateImage from '../assets/optimized/pny.webp';
import pnyImage from '../assets/optimized/PNY.webp';
import smartWatchImage from '../assets/optimized/smart-watch.webp';
import bgChangerImage from '../assets/optimized/bg-changer.webp';
import currencyImage from '../assets/optimized/currency-converter.webp';
import urlShortenerImage from '../assets/optimized/urlshortner.webp';
import writingCertificate from '../assets/Creative_Writing_Certificate.pdf';
import writingImage from '../assets/optimized/writing.webp';
import profileImage from '../assets/optimized/aman.webp';

const icon = (name) => `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}`;

export const initialPortfolioData = {
  profile: {
    name: 'Amanullah Ibrahim',
    brand: 'Amaan',
    roles: ['MERN Stack Developer', 'Full-Stack Web Developer', 'React.js Enthusiast'],
    intro: 'I specialize in building scalable, secure, and dynamic full-stack web applications. Passionate about clean code and creating beautiful user experiences.',
    resume: cvFile,
    github: 'https://github.com/amaan2t3',
    linkedin: 'https://www.linkedin.com/in/amanullah-ibrahim-819335329/',
    githubCount: '10+',
    linkedinCount: '1k+',
  },
  about: {
    image: profileImage,
    paragraphs: [
      'Hello! My name is Amanullah and I enjoy creating things that live on the internet. My interest in web development started back when I was exploring how interactive websites were built, which led me down the path of becoming a full-stack developer.',
      'I am currently a BSIT student at National Skill University Islamabad (2026–Present), and I recently completed a specialized certification in MERN Stack Development. I’m passionate about writing clean, scalable code and building products that provide a great user experience.',
      'Right now, my main focus is on expanding my skill set and I am actively seeking a MERN Stack internship where I can contribute to real-world projects, learn from experienced engineers, and grow as a developer.',
    ],
  },
  skills: [
    {
      title: 'Front-End Development',
      icon: 'monitor',
      skills: [
        { name: 'HTML 5', icon: icon('html5/html5-original.svg') },
        { name: 'CSS 3', icon: icon('css3/css3-original.svg') },
        { name: 'JavaScript', icon: icon('javascript/javascript-original.svg') },
        { name: 'Tailwind CSS', icon: icon('tailwindcss/tailwindcss-original.svg') },
        { name: 'React JS', icon: icon('react/react-original.svg') },
        { name: 'Redux', icon: icon('redux/redux-original.svg') },
        { name: 'Material UI', icon: icon('materialui/materialui-original.svg') },
        { name: 'Scss', icon: icon('sass/sass-original.svg') },
        { name: 'Node JS', icon: icon('nodejs/nodejs-original.svg') },
      ],
    },
    {
      title: 'Back-End & Version Control',
      icon: 'code',
      skills: [
        { name: 'Express JS', icon: icon('express/express-original.svg'), invert: true },
        { name: 'MongoDB', icon: icon('mongodb/mongodb-original.svg') },
        { name: 'Mongoose', icon: icon('mongoose/mongoose-original.svg') },
        { name: 'Git', icon: icon('git/git-original.svg') },
        { name: 'GitHub', icon: icon('github/github-original.svg'), invert: true },
      ],
    },
    {
      title: 'Tools & Platforms',
      icon: 'tools',
      skills: [
        { name: 'VS Code', icon: icon('vscode/vscode-original.svg') },
        { name: 'ChatGPT', icon: 'https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg' },
        { name: 'Chrome', icon: icon('chrome/chrome-original.svg') },
        { name: 'MongoDB Compass', icon: 'https://img.icons8.com/color/144/mongodb.png' },
        { name: 'Postman', icon: icon('postman/postman-original.svg') },
        { name: 'Ubuntu', icon: 'https://img.icons8.com/color/144/ubuntu--v1.png' },
      ],
    },
  ],
  experience: [
    {
      title: 'Web Development Intern',
      company: 'Kiwi Logics Labs',
      period: 'Jan 2026 – Apr 2026',
      description: 'Successfully completed an internship exhibiting professionalism and a positive attitude towards assigned tasks. Found to be punctual, responsible, and eager to learn.',
      side: 'left',
      image: kiwiImage,
    },
    {
      title: 'Front End Development Intern',
      company: 'DevelopersHub Corporation',
      period: 'Nov 2025 – Dec 2025',
      description: 'Successfully completed a six-week virtual internship program with exceptional performance and significant contributions demonstrated throughout the period.',
      side: 'right',
      image: devHubImage,
    },
  ],
  projects: [
    {
      title: 'Futsal Booking System',
      description: 'PlayArena is a Futsal Booking System that allows users to explore futsal grounds in Rawalpindi and Skardu, check availability, and request bookings online with admin approval.',
      tech: ['Node.js', 'EJS', 'JavaScript', 'HTML/CSS', 'MONGODB'],
      github: 'https://github.com/amaan2t3/playarena-sports-booking',
      live: 'https://playarena-sports-booking.vercel.app/',
      image: futsalImage,
    },
    {
      title: 'URL Shortener Service',
      description: 'A fast and secure URL shortening application with user authentication. It features a robust Node.js backend using EJS templates and Supabase for real-time database management.',
      tech: ['Node.js', 'EJS', 'JavaScript', 'HTML/CSS', 'Supabase'],
      github: 'https://github.com/amaan2t3',
      live: 'https://url-shortener-psi-ivory.vercel.app/',
      image: urlShortenerImage,
    },
    {
      title: 'Full-Stack Blog Web Application',
      description: 'A comprehensive blog platform allowing users to create, read, update, and delete posts with image upload capabilities and secure JWT authentication.',
      tech: ['JavaScript', 'React.js', 'Node.js', 'API Integration', 'Appwrite', 'JWT', 'Tailwind CSS'],
      github: 'https://github.com/amaan2t3',
      live: 'https://blog-app-five-psi-40.vercel.app',
      image: blogImage,
    },
    {
      title: 'Gym & Fitness Website',
      description: 'A modern, responsive fitness platform featuring a BMI calculator, dynamic exercise lists, and a sleek user interface for gym enthusiasts.',
      tech: ['JavaScript', 'React.js', 'Node.js', 'Tailwind CSS'],
      github: 'https://github.com/amaan2t3',
      live: 'https://gym-fitness-amaan.netlify.app',
      image: gymImage,
    },
    {
      title: 'Currency Converter',
      description: 'A real-time currency conversion application fetching live exchange rates to provide accurate monetary conversions globally.',
      tech: ['JavaScript', 'React.js', 'API Integration', 'Tailwind CSS', 'Node.js'],
      github: 'https://github.com/amaan2t3',
      live: 'https://currency-converter-amaan.netlify.app/',
      image: currencyImage,
    },
    {
      title: 'Background Changer',
      description: 'An interactive utility application that dynamically alters the background color of the interface based on user interaction.',
      tech: ['JavaScript', 'React.js', 'Tailwind CSS', 'State Management'],
      github: 'https://github.com/amaan2t3',
      live: 'https://bg-changer-amaan.netlify.app/',
      image: bgChangerImage,
    },
    {
      title: 'Smartwatch UI Design',
      description: 'A sleek, interactive user interface mockup for a smartwatch application demonstrating modern frontend design principles and animations.',
      tech: ['HTML5', 'React.js', 'Tailwind CSS', 'JavaScript', 'Node.js', 'API Integration'],
      github: 'https://github.com/amaan2t3',
      live: 'https://smartwatch-ui-amaan.netlify.app/',
      image: smartWatchImage,
    },
  ],
  education: [
    {
      degree: 'BS Information Technology',
      institution: 'National Skill University Islamabad',
      period: '2026 – Present',
      icon: 'graduation',
      image: nsuImage,
    },
    {
      degree: 'Intermediate (ICS)',
      institution: 'Dr. A.Q. Khan School & College',
      period: '2022 – 2024',
      icon: 'book',
      image: aqImage,
    },
    {
      degree: 'MERN Stack Development Certification',
      institution: 'PNY Training Center',
      period: 'Mar 2025',
      icon: 'award',
      image: pnyImage,
    },
    {
      degree: 'C++ Essentials 1',
      institution: 'Cisco Networking Academy',
      period: 'Jun 2026',
      icon: 'award',
      image: ciscoImage,
    },
  ],
  certificates: [
    {
      title: 'MERN Stack Development',
      issuer: 'PNY Training Center',
      date: 'September 2025',
      image: pnyCertificateImage,
      link: '',
    },
    {
      title: 'C++ Essentials 1',
      issuer: 'Cisco Networking Academy',
      date: 'Jun 2026',
      image: cppImage,
      link: cppCertificate,
    },
    {
      title: 'Digital Literacy',
      issuer: 'Ignite / DigiSkills',
      date: '2026',
      image: digitalImage,
      link: digitalCertificate,
    },
    {
      title: 'Creative Writing',
      issuer: 'Ignite / DigiSkills',
      date: 'April 2026',
      image: writingImage,
      link: writingCertificate,
    },
  ],
  contact: {
    location: 'Pindora, Rawalpindi, Pakistan',
    email: 'amaanullah9011@gmail.com',
    phone: '0328 1923524',
    phoneLink: '03281923524',
    whatsapp: '923281923524',
  },
};

export const optimizedPortfolioAssets = [
  { legacyPrefix: 'aman-', image: profileImage },
  { legacyPrefix: 'Aqcollege-', image: aqImage },
  { legacyPrefix: 'cisco-logo-', image: ciscoImage },
  { legacyPrefix: 'C__-', image: cppImage },
  { legacyPrefix: 'DeveloperHub-intership-', image: devHubImage },
  { legacyPrefix: 'futsal-', image: futsalImage },
  { legacyPrefix: 'GYM-', image: gymImage },
  { legacyPrefix: 'blogwebapp-', image: blogImage },
  { legacyPrefix: 'kiwilogic-intership-', image: kiwiImage },
  { legacyPrefix: 'Nsu-mukhtar-auditorium-', image: nsuImage },
  { legacyPrefix: 'pny-', image: pnyCertificateImage },
  { legacyPrefix: 'PNY-', image: pnyImage },
  { legacyPrefix: 'smart-watch-', image: smartWatchImage },
  { legacyPrefix: 'bg-changer-', image: bgChangerImage },
  { legacyPrefix: 'currency-converter-', image: currencyImage },
  { legacyPrefix: 'urlshortner-', image: urlShortenerImage },
  { legacyPrefix: 'digital-', image: digitalImage },
  { legacyPrefix: 'writing-', image: writingImage },
];
