import React, { lazy, Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import RouteTracker from './components/RouteTracker';
import { PortfolioProvider } from './context/PortfolioProvider';
import { usePortfolio } from './context/usePortfolio';
import { ThemeContext } from './context/ThemeContext';

const Hero = lazy(() => import('./components/Hero'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Education = lazy(() => import('./components/Education'));
const Certificates = lazy(() => import('./components/Certificates'));
const Contact = lazy(() => import('./components/Contact'));
const Admin = lazy(() => import('./components/Admin'));

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
        <Suspense fallback={<div className="min-h-screen" aria-busy="true" />}>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Admin />} />
          </Routes>
        </Suspense>
      ) : (
        <>
          <Navbar />
          <main className="relative z-10 w-full">
            <Suspense fallback={<div className="min-h-[65vh]" aria-busy="true" />}>
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
            </Suspense>
          </main>
          <footer className="site-footer relative z-10">
            <div className="site-footer-inner">
              <span className="site-footer-brand">{data.profile.brand}<span>.</span></span>
              <p>&copy; {new Date().getFullYear()} {data.profile.name}. Crafted with care.</p>
              <a href="#hero" onClick={(event) => { event.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Back to top ↑</a>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
