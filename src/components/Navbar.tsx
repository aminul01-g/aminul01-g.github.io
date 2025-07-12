import { Link, useLocation, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blog', to: '/blog' },
  // Contact handled as anchor link
];

export default function Navbar(): React.ReactElement {
  const [menuOpen, setMenuOpen] = useState(false);
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
    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
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
    <motion.nav
      className="glass-card backdrop-blur-xl border-b border-white/10 sticky top-0 z-50"
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo and ThemeToggle */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            to="/"
            className="text-2xl font-bold bg-gradient-to-r from-black to-gray-700 bg-clip-text text-transparent dark:from-primary dark:to-indigo-500 hover:scale-105 transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
            aria-label="Go to homepage"
          >
            Aminul
          </Link>
          <ThemeToggle />
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          ref={menuButtonRef}
          className="sm:hidden flex flex-col justify-center items-center w-8 h-8 relative z-50 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
          onClick={handleMenuToggle}
          onKeyDown={handleMenuKeyDown}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-haspopup="true"
        >
          <motion.span
            className="w-6 h-0.5 bg-current transform transition-all duration-300"
            animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-current transform transition-all duration-300 mt-1"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
          />
          <motion.span
            className="w-6 h-0.5 bg-current transform transition-all duration-300 mt-1"
            animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          />
        </motion.button>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden sm:flex items-center space-x-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          role="menubar"
          aria-label="Desktop navigation menu"
        >
          {navLinks.map((link, index) => (
            <motion.div
              key={link.to}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              role="menuitem"
            >
              <Link
                to={link.to}
                className="relative text-glass dark:text-white font-medium hover:text-primary-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-3 py-2 group"
                aria-current={location.pathname === link.to ? 'page' : undefined}
              >
                {link.label}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-indigo-500 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          ))}

          {/* Contact Button */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            role="menuitem"
          >
            <a
              href="/#contact"
              className="relative text-glass dark:text-white font-medium hover:text-primary-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-3 py-2 group"
              onClick={handleContactClick}
              aria-label="Go to contact section"
            >
              Contact
              <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-indigo-500 rounded-full"
                initial={{ width: 0 }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.3 }}
              />
            </a>
          </motion.div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              id="mobile-menu"
              className="absolute top-full left-0 w-full glass-card backdrop-blur-xl border-t border-white/10 sm:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              role="menu"
              aria-label="Mobile navigation menu"
            >
              <div className="p-4 space-y-2">
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
                      className="block py-3 px-4 rounded-lg text-white font-medium hover:text-primary-300 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/10"
                      onClick={() => setMenuOpen(false)}
                      aria-current={location.pathname === link.to ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: navLinks.length * 0.1 }}
                  role="menuitem"
                >
                  <a
                    href="/#contact"
                    className="block py-3 px-4 rounded-lg text-white font-medium hover:text-primary-300 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white/10"
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
      </div>
    </motion.nav>
  );
}
