import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmartSearch } from './SmartSearch';
import { FiSearch } from 'react-icons/fi';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  // Contact handled as anchor link
];

export default function Navbar(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    if (menuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [menuOpen]);

  // Trap focus in mobile menu
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const focusableElements = menuRef.current.querySelectorAll(
        'a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      const handleTabKey = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleTabKey);
      firstElement?.focus();
      return () => document.removeEventListener('keydown', handleTabKey);
    }
  }, [menuOpen]);

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleMenuToggle();
    }
  };

  return (
    <>
      {/* ===== Navbar Island ===== */}
      <motion.nav
        className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-11rem)] sm:w-[90%] max-w-2xl glass-card backdrop-blur-3xl border border-white/20 z-50 shadow-glass rounded-[24px]"
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: 100, opacity: 0, x: '-50%' }}
        animate={{ y: 0, opacity: 1, x: '-50%' }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="flex justify-between items-center px-3 sm:px-6 py-2.5 sm:py-3">
          {/* Logo and Search */}
          <motion.div
            className="flex items-center gap-1.5 sm:gap-4"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
          >
            <Link
              to="/"
              className="text-xl sm:text-2xl font-bold font-display text-gradient hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg px-1 sm:px-2 py-1 leading-none"
              aria-label="Go to homepage"
            >
              Aminul
            </Link>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              title="Search projects, blog posts, and skills"
              aria-label="Open search"
            >
              <FiSearch className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </motion.div>

          {/* Mobile Menu Button – 44×44px Touch Target */}
          <motion.button
            ref={menuButtonRef}
            className="sm:hidden flex items-center justify-center w-11 h-11 rounded-xl glass-card border-gradient hover:shadow-glow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 relative z-50"
            onClick={handleMenuToggle}
            onKeyDown={handleMenuKeyDown}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              className="w-6 h-6 flex flex-col justify-center items-center"
              animate={menuOpen ? 'open' : 'closed'}
            >
              <motion.span
                className="w-5 h-0.5 bg-current mb-1 rounded-full"
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 6 } }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-current mb-1 rounded-full"
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="w-5 h-0.5 bg-current rounded-full"
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -6 } }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.button>

          {/* Desktop Menu */}
          <motion.div
            className="hidden sm:flex items-center space-x-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.to}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                role="menuitem"
              >
                <Link
                  to={link.to}
                  className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/50 group ${
                    location.pathname === link.to
                      ? 'text-primary bg-primary/10 shadow-glow'
                      : 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/5'
                  }`}
                  aria-current={location.pathname === link.to ? 'page' : undefined}
                >
                  {link.label}
                  <motion.div
                    className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-primary rounded-full"
                    initial={{ width: 0, x: '-50%' }}
                    whileHover={{ width: '80%' }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  />
                  {location.pathname === link.to && (
                    <motion.div
                      className="absolute inset-0 bg-primary/10 rounded-xl -z-10"
                      layoutId="activeTab"
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            {/* Desktop Contact */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              role="menuitem"
            >
              <a
                href="/#contact"
                className="relative px-4 py-2 rounded-xl font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/5 transition-all duration-300 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/50 group"
                onClick={handleContactClick}
                aria-label="Go to contact section"
              >
                Contact
                <motion.div
                  className="absolute bottom-0 left-1/2 h-0.5 bg-gradient-primary rounded-full"
                  initial={{ width: 0, x: '-50%' }}
                  whileHover={{ width: '80%' }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.nav>

      {/* ===== Mobile Menu – rendered outside <nav> to avoid overflow:hidden clipping ===== */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            className="fixed bottom-[5.5rem] left-1/2 -translate-x-1/2 w-[calc(100vw-3rem)] border border-white/20 sm:hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[80] rounded-[24px] overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            role="menu"
            aria-label="Mobile navigation menu"
          >
            <div className="p-4 space-y-2 flex flex-col">
              {/* Mobile Search */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                role="menuitem"
              >
                <button
                  onClick={() => {
                    setSearchOpen(true);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-3 w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10"
                >
                  <FiSearch className="w-5 h-5" />
                  Search
                </button>
              </motion.div>

              {navLinks.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  role="menuitem"
                >
                  <Link
                    to={link.to}
                    className={`block py-3 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      location.pathname === link.to
                        ? 'text-primary bg-primary/10 shadow-glow'
                        : 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/5'
                    }`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={location.pathname === link.to ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Contact */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                role="menuitem"
              >
                <a
                  href="/#contact"
                  className="block py-3 px-4 rounded-xl font-medium text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-primary/5 transition-all duration-300 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-primary/50"
                  onClick={handleContactClick}
                  aria-label="Go to contact section"
                >
                  Contact
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smart Search Modal */}
      <SmartSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
