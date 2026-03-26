import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sparkles } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function ThemeToggle(): React.ReactElement {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-6 sm:top-8 right-6 sm:right-8 z-[100] w-12 h-12 flex items-center justify-center rounded-full glass-card border-[var(--glass-border)] transition-all duration-500 overflow-hidden shadow-[var(--glass-shadow)] hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary/50`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      aria-label="Toggle Theme"
      title={`Switch to ${theme === 'dark' ? 'Liquid Crystal' : 'Dark Glass'} mode`}
    >
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: theme === 'dark' ? 0 : 90,
          scale: theme === 'dark' ? 1 : 0,
          opacity: theme === 'dark' ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <Moon className="w-5 h-5 text-indigo-300" />
      </motion.div>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{
          rotate: theme === 'transparent' ? 0 : -90,
          scale: theme === 'transparent' ? 1 : 0,
          opacity: theme === 'transparent' ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <Sparkles className="w-5 h-5 text-amber-300" />
      </motion.div>
    </motion.button>
  );
}
