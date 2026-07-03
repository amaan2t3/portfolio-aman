import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

function App() {
  return (
    <div className="min-h-screen">
      <div className="mesh-bg"></div>
      <Navbar />
      <main className="relative z-10 w-full">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <footer className="glass mt-24 py-6 text-center text-slate-400 relative z-10">
        <p>&copy; {new Date().getFullYear()} Amanullah Ibrahim. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
