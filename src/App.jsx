import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import RouteTracker from './components/RouteTracker';
import Admin from './components/Admin';
import { PortfolioProvider } from './context/PortfolioProvider';
import { usePortfolio } from './context/usePortfolio';
import { ThemeContext } from './context/ThemeContext';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Default to light mode if no preference is saved
    return savedTheme ? savedTheme === 'dark' : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <PortfolioProvider>
        <Router>
          <RouteTracker />
          <AppRoutes />
        </Router>
      </PortfolioProvider>
    </ThemeContext.Provider>
  );
}

function AppRoutes() {
  const location = useLocation();
  const { data } = usePortfolio();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen">
      <div className="mesh-bg"></div>
      {isAdmin ? (
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Admin />} />
        </Routes>
      ) : (
        <>
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
          <footer className="glass mt-24 py-6 text-center text-text-secondary relative z-10">
            <p>&copy; {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
