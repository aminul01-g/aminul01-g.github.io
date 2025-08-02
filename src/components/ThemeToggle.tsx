import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiMonitor, FiSettings, FiEye } from 'react-icons/fi';
import { useTheme } from '../contexts/ThemeContext';

export default function ThemeToggle(): React.ReactElement {
  const { currentTheme, toggleTheme, isDarkMode, themeConfig } = useTheme();

  const getThemeIcon = () => {
    switch (currentTheme) {
      case 'system':
        return <FiMonitor className="h-5 w-5" />;
      case 'light':
        return <FiSun className="h-5 w-5" />;
      case 'dark':
        return <FiMoon className="h-5 w-5" />;
      case 'amoled':
        return (
          <div className="h-5 w-5 rounded-full bg-black border-2 border-cyan-400 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-cyan-400" />
          </div>
        );
      case 'nord':
        return (
          <div className="h-5 w-5 rounded-full bg-blue-300 border-2 border-blue-500 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
          </div>
        );
      case 'solarized':
        return (
          <div className="h-5 w-5 rounded-full bg-yellow-600 border-2 border-yellow-800 flex items-center justify-center">
            <div className="h-2 w-2 rounded-full bg-yellow-900" />
          </div>
        );
      case 'high-contrast':
        return <FiEye className="h-5 w-5" />;
      default:
        return <FiSettings className="h-5 w-5" />;
    }
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
      className={`p-2 rounded-full border shadow transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent ${
        isDarkMode
          ? 'bg-gray-800 border-gray-700 text-yellow-300 hover:text-yellow-200'
          : 'bg-white border-gray-200 text-gray-700 hover:text-primary'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Current theme: ${themeConfig.name}. Click to cycle themes`}
      role="button"
      tabIndex={0}
      title={`Current: ${themeConfig.name}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentTheme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.2 }}
          aria-hidden="true"
        >
          {getThemeIcon()}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
