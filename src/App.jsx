import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <div className="mesh-bg"></div>
        <Navbar />
        <main className="relative z-10 w-full">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/education" element={<Education />} />
            <Route path="/certificates" element={<Certificates />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <footer className="glass mt-24 py-6 text-center text-slate-400 relative z-10">
          <p>&copy; {new Date().getFullYear()} Amanullah Ibrahim. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
