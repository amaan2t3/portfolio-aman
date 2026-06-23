// js/components.js

const skillsData = [
  {
    category: "Frontend Development",
    icon: "🎨",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS"]
  },
  {
    category: "Backend Development",
    icon: "⚙️",
    skills: ["Node.js", "Express.js", "PHP", "Laravel", "REST APIs", "GraphQL"]
  },
  {
    category: "Database & Storage",
    icon: "🗄️",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Appwrite", "Redis"]
  },
  {
    category: "Tools & DevOps",
    icon: "🛠️",
    skills: ["Git", "GitHub", "Docker", "VS Code", "Vercel", "Postman"]
  }
];

const projectsData = [

  {
    title: "Full-Stack Blog Web Application",
    description: "A complete blog platform with JWT-based authentication, allowing users to create, edit, delete posts and upload images. Fully responsive UI.",
    image: "images/project_blog_1782203637892.png",
    tech: ["React.js", "Node.js", "Appwrite", "Vercel"],
    live: "https://blog-app-five-psi-40.vercel.app",
    github: "#"
  },
  {
    title: "Gym & Fitness Website",
    description: "Designed and developed a mobile-first gym website with an interactive BMI calculator and dynamic daily exercise list.",
    image: "images/project_gym_1782203651186.png",
    tech: ["React.js", "Tailwind CSS", "JavaScript"],
    live: "https://gym-fitness-amaan.netlify.app",
    github: "#"
  },
  {
    title: "Mini JavaScript Projects (3 Apps)",
    description: "Built interactive web applications including a Currency Converter, Background Color Changer, and a Smartwatch UI.",
    image: "images/project_js_1782203662518.png",
    tech: ["JavaScript", "HTML5", "CSS3", "DOM Manipulation"],
    liveLinks: [
      { name: "Currency", url: "https://currency-converter-amaan.netlify.app/" },
      { name: "BG Changer", url: "https://bg-changer-amaan.netlify.app/" },
      { name: "Smartwatch", url: "https://smartwatch-ui-amaan.netlify.app/" }
    ],
    github: "#"
  }
];

const experienceData = [
  {
    date: "2025 - Present",
    title: "Bachelor of Computer Science (BSCS)",
    subtitle: "Virtual University of Pakistan",
    description: "Currently pursuing a degree in Computer Science, focusing on full-stack development, data structures, and software engineering principles."
  },
  {
    date: "Mar 2025",
    title: "MERN Stack Certification",
    subtitle: "PNY Training Center",
    description: "Completed comprehensive training in MongoDB, Express.js, React.js, and Node.js. Built multiple production-ready applications."
  },
  {
    date: "2024 - 2025",
    title: "Freelance Full Stack Developer",
    subtitle: "Self-Employed",
    description: "Developed custom web applications for local businesses. Specialized in responsive design and API integrations."
  }
];

export function renderSkills() {
  const skillsContainer = document.getElementById('skills-container');
  if (!skillsContainer) return;

  skillsContainer.innerHTML = skillsData.map(category => `
    <div class="skill-category glass-card reveal">
      <h3><span>${category.icon}</span> ${category.category}</h3>
      <div class="skill-tags">
        ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

export function renderProjects() {
  const projectsContainer = document.getElementById('projects-container');
  if (!projectsContainer) return;

  projectsContainer.innerHTML = projectsData.map(project => `
    <div class="project-card glass-card reveal">
      <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.description}</p>
        <div class="project-tech">
          ${project.tech.map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="project-links" style="flex-wrap: wrap;">
          ${project.liveLinks ? project.liveLinks.map(link => `<a href="${link.url}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;" target="_blank">${link.name}</a>`).join('') : ''}
          ${project.live && !project.liveLinks ? `<a href="${project.live}" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;" target="_blank">Live Demo</a>` : ''}
          <a href="${project.github}" class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.85rem;" target="_blank">GitHub</a>
        </div>
      </div>
    </div>
  `).join('');
}

export function renderExperience() {
  const experienceContainer = document.getElementById('experience-container');
  if (!experienceContainer) return;

  experienceContainer.innerHTML = experienceData.map(exp => `
    <div class="timeline-item reveal fade-left">
      <div class="timeline-date">${exp.date}</div>
      <h3 class="timeline-title">${exp.title}</h3>
      <div class="timeline-subtitle">${exp.subtitle}</div>
      <p class="timeline-desc">${exp.description}</p>
    </div>
  `).join('');
}
