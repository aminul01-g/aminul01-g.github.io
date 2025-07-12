import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccessibility } from './AccessibilityProvider';

export default function AccessibilityMenu(): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const { fontSize, setFontSize, isHighContrast, toggleHighContrast } = useAccessibility();
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    if (announcement) {
      const timeout = setTimeout(() => setAnnouncement(''), 2000);
      return () => clearTimeout(timeout);
    }
  }, [announcement]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    setAnnouncement(`Font size set to ${size}`);
  };
  const handleHighContrastToggle = () => {
    toggleHighContrast();
    setAnnouncement(`High contrast mode ${isHighContrast ? 'disabled' : 'enabled'}`);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Accessibility Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        className="bg-primary text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent"
        aria-label="Accessibility settings"
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </button>

      {/* Accessibility Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="accessibility-menu"
            className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 p-4 min-w-[280px]"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-label="Accessibility settings"
            aria-modal="true"
            aria-labelledby="accessibility-controls-heading"
          >
            {/* Visually hidden heading for screen readers */}
            <h2 className="sr-only" id="accessibility-controls-heading">Accessibility Controls</h2>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Accessibility Settings
              </h3>

              {/* Font Size Control */}
              <div>
                <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Font Size
                </span>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      id={`font-size-${size}`}
                      onClick={() => handleFontSizeChange(size)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        fontSize === size
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                      aria-pressed={fontSize === size}
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  High Contrast
                </span>
                <button
                  id="high-contrast-toggle"
                  onClick={handleHighContrastToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isHighContrast ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                  role="switch"
                  aria-checked={isHighContrast}
                  aria-label="Toggle high contrast mode"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isHighContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Keyboard Shortcuts Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Keyboard Shortcuts
                </h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                  <div>• Tab: Navigate through elements</div>
                  <div>• Enter/Space: Activate buttons</div>
                  <div>• Arrow keys: Navigate carousels</div>
                  <div>• Escape: Close menus</div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-4 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live region for accessibility announcements */}
      <div aria-live="polite" role="status" className="sr-only" id="accessibility-live-region">
        {announcement}
      </div>
    </div>
  );
} 