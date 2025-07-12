import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';

export default function ThemeToggle(): React.ReactElement {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleTheme();
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      onKeyDown={handleKeyDown}
      className="glass-card p-2 rounded-full text-white hover:text-primary-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      role="switch"
      aria-checked={isDark}
      tabIndex={0}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="sun"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m6.364-6.364l-.707-.707m12.728 12.728l-.707.707M6.343 6.343l-.707-.707m12.728 12.728l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </motion.svg>
        ) : (
          <motion.svg
            key="moon"
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.2 }}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </motion.svg>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
