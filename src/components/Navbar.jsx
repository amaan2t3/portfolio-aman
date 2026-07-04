import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Skills', to: '/skills' },
  { name: 'Experience', to: '/experience' },
  { name: 'Projects', to: '/projects' },
  { name: 'Education', to: '/education' },
  { name: 'Certificates', to: '/certificates' },
  { name: 'Contact', to: '/contact' },
];

const SEARCH_INDEX = [
  { keyword: 'skills', title: 'My Skills', path: '/skills', desc: 'React, Node, MongoDB, etc.' },
  { keyword: 'react', title: 'React.js', path: '/skills', desc: 'Skill' },
  { keyword: 'node', title: 'Node.js', path: '/skills', desc: 'Skill' },
  { keyword: 'mern', title: 'MERN Stack', path: '/skills', desc: 'Skill' },
  { keyword: 'projects', title: 'Projects', path: '/projects', desc: 'View my portfolio projects' },
  { keyword: 'about', title: 'About Me', path: '/about', desc: 'Learn more about my background' },
  { keyword: 'experience', title: 'Experience', path: '/experience', desc: 'My work history' },
  { keyword: 'education', title: 'Education', path: '/education', desc: 'My academic background' },
  { keyword: 'contact', title: 'Contact', path: '/contact', desc: 'Get in touch' },
  { keyword: 'certificates', title: 'Certificates', path: '/certificates', desc: 'My certifications' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
  };

  const handleResultClick = (path) => {
    navigate(path);
    setSearchQuery('');
    setShowResults(false);
    setIsOpen(false);
  };

  const filteredResults = SEARCH_INDEX.filter(item =>
    item.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-4' : 'bg-transparent py-6'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-12">
          <NavLink to="/" className="text-xl md:text-2xl font-bold text-white tracking-tighter flex items-center gap-1 md:gap-2">
            <span className="font-mono text-brand-500">{"</>"}</span> Aman<span className="text-brand-500">{"</>"}</span>
          </NavLink>

          {/* Desktop Search Bar */}
          <div className="hidden md:block relative">
            <div className="flex items-center bg-[#0d121c] rounded-lg px-3 py-1.5 border border-white/10 focus-within:border-brand-500 transition-colors">
              <Search size={16} className="text-slate-400 mr-2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
                onFocus={() => { if (searchQuery.length > 0) setShowResults(true); }}
                className="bg-transparent border-none outline-none text-sm text-slate-200 w-40 focus:w-56 transition-all"
              />
              <span className="hidden md:flex bg-white/5 text-slate-400 text-[10px] px-1.5 py-0.5 rounded ml-2 border border-white/10 whitespace-nowrap">Ctrl+K</span>
            </div>

            {/* Desktop Search Results Dropdown */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute left-0 top-full mt-2 w-72 glass rounded-xl border border-slate-700 shadow-xl overflow-hidden"
                >
                  {filteredResults.length > 0 ? (
                    filteredResults.map((result, i) => (
                      <div
                        key={i}
                        onClick={() => handleResultClick(result.path)}
                        className="px-4 py-3 hover:bg-slate-800/80 cursor-pointer border-b border-slate-700/50 last:border-0"
                      >
                        <div className="text-sm font-medium text-white">{result.title}</div>
                        <div className="text-xs text-slate-400">{result.desc}</div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-400 text-center">No results found</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-2">
          <div className="flex space-x-2">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                className={({ isActive }) => `cursor-pointer transition-colors px-3 py-1.5 rounded-lg font-medium ${isActive ? 'bg-white/10 backdrop-blur-sm text-brand-500' : 'text-slate-300 hover:text-brand-500'}`}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-brand-500 p-2 -mr-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass absolute top-full left-0 w-full flex flex-col items-center py-4 space-y-4"
          >
            {/* Mobile Search */}
            <div className="w-full px-6 pb-4 mb-2 border-b border-slate-700/50">
              <div className="flex items-center bg-slate-800/50 rounded-full px-4 py-2 border border-slate-700 focus-within:border-brand-500 transition-colors">
                <Search size={18} className="text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search skills, projects..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="bg-transparent border-none outline-none text-base text-slate-200 w-full"
                />
              </div>

              {/* Mobile Search Results */}
              {showResults && (
                <div className="mt-2 w-full bg-slate-800/80 rounded-xl border border-slate-700 overflow-hidden max-h-48 overflow-y-auto">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((result, i) => (
                      <div
                        key={i}
                        onClick={() => handleResultClick(result.path)}
                        className="px-4 py-3 hover:bg-slate-700 cursor-pointer border-b border-slate-700/50 last:border-0"
                      >
                        <div className="text-sm font-medium text-white">{result.title}</div>
                        <div className="text-xs text-slate-400">{result.desc}</div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-sm text-slate-400 text-center">No results found</div>
                  )}
                </div>
              )}
            </div>

            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) => `text-lg cursor-pointer px-4 py-2 rounded-lg text-center ${isActive ? 'bg-white/10 backdrop-blur-sm text-brand-500' : 'text-slate-300 hover:text-brand-500'}`}
              >
                {link.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
