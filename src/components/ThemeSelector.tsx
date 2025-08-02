import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSettings, FiCheck, FiMonitor, FiSun, FiMoon, FiEye } from 'react-icons/fi';
import { useTheme, ThemeType } from '../contexts/ThemeContext';

interface ThemePreviewProps {
  theme: ThemeType;
  isSelected: boolean;
  onSelect: () => void;
}

// Optimized theme colors that match the CSS definitions exactly
const getThemeColors = (theme: ThemeType) => {
  switch (theme) {
    case 'light':
      return {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8fafc',
        bgTertiary: '#f1f5f9',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        border: '#e2e8f0',
        primary: '#7c3aed'
      };
    case 'dark':
      return {
        bgPrimary: '#0f172a',
        bgSecondary: '#1e293b',
        bgTertiary: '#334155',
        textPrimary: '#f8fafc',
        textSecondary: '#cbd5e1',
        border: '#475569',
        primary: '#a78bfa'
      };
    case 'amoled':
      return {
        bgPrimary: '#000000',
        bgSecondary: '#0a0a0a',
        bgTertiary: '#1a1a1a',
        textPrimary: '#ffffff',
        textSecondary: '#e0e0e0',
        border: '#2a2a2a',
        primary: '#00ffe7'
      };
    case 'nord':
      return {
        bgPrimary: '#2e3440',
        bgSecondary: '#3b4252',
        bgTertiary: '#434c5e',
        textPrimary: '#eceff4',
        textSecondary: '#d8dee9',
        border: '#4c566a',
        primary: '#88c0d0'
      };
    case 'solarized':
      return {
        bgPrimary: '#002b36',
        bgSecondary: '#073642',
        bgTertiary: '#0d4f5c',
        textPrimary: '#fdf6e3',
        textSecondary: '#eee8d5',
        border: '#586e75',
        primary: '#b58900'
      };
    case 'high-contrast':
      return {
        bgPrimary: '#ffffff',
        bgSecondary: '#f5f5f5',
        bgTertiary: '#e8e8e8',
        textPrimary: '#000000',
        textSecondary: '#1a1a1a',
        border: '#000000',
        primary: '#0000ff'
      };
    default: // system
      return {
        bgPrimary: '#ffffff',
        bgSecondary: '#f8fafc',
        bgTertiary: '#f1f5f9',
        textPrimary: '#0f172a',
        textSecondary: '#475569',
        border: '#e2e8f0',
        primary: '#7c3aed'
      };
  }
};

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme, isSelected, onSelect }) => {
  const { availableThemes, currentTheme } = useTheme();
  const themeConfig = availableThemes.find(t => t.value === theme);
  const currentColors = getThemeColors(currentTheme);
  
  const getThemeIcon = (themeType: ThemeType) => {
    const iconStyle = { color: currentColors.textPrimary };
    switch (themeType) {
      case 'system': return <FiMonitor className="w-4 h-4" style={iconStyle} />;
      case 'light': return <FiSun className="w-4 h-4" style={iconStyle} />;
      case 'dark': return <FiMoon className="w-4 h-4" style={iconStyle} />;
      case 'amoled': 
        return (
          <div 
            className="w-4 h-4 rounded-full border-2 flex items-center justify-center"
            style={{ backgroundColor: '#000000', borderColor: '#00ffe7' }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#00ffe7' }} />
          </div>
        );
      case 'nord': 
        return (
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: '#88c0d0' }}
          />
        );
      case 'solarized': 
        return (
          <div 
            className="w-4 h-4 rounded-full"
            style={{ backgroundColor: '#b58900' }}
          />
        );
      case 'high-contrast': return <FiEye className="w-4 h-4" style={iconStyle} />;
      default: return <FiSettings className="w-4 h-4" style={iconStyle} />;
    }
  };

  const getPreviewColors = (themeType: ThemeType) => {
    const colors = getThemeColors(themeType);
    return {
      bg: colors.bgPrimary,
      text: colors.textPrimary,
      accent: colors.primary,
      border: colors.border
    };
  };

  const colors = getPreviewColors(theme);

  return (
    <motion.button
      onClick={onSelect}
      className="relative p-4 rounded-xl border-2 transition-all duration-200 group"
      style={{
        backgroundColor: currentColors.bgSecondary,
        borderColor: isSelected ? currentColors.primary : currentColors.border,
        color: currentColors.textPrimary,
        boxShadow: isSelected ? `0 0 0 2px ${currentColors.primary}30` : 'none'
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      layout
    >
      {/* Theme Preview */}
      <div 
        className="w-full h-16 rounded-lg mb-3 relative overflow-hidden border-2"
        style={{ 
          backgroundColor: colors.bg,
          borderColor: colors.border
        }}
      >
        {/* Preview Content */}
        <div className="p-2 h-full flex flex-col justify-between">
          <div className="flex items-center gap-1">
            <div 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: colors.accent }}
            />
            <div 
              className="w-8 h-1 rounded"
              style={{ backgroundColor: colors.text, opacity: 0.7 }}
            />
          </div>
          <div className="space-y-1">
            <div 
              className="w-12 h-1 rounded"
              style={{ backgroundColor: colors.text, opacity: 0.9 }}
            />
            <div 
              className="w-8 h-1 rounded"
              style={{ backgroundColor: colors.text, opacity: 0.5 }}
            />
          </div>
        </div>

        {/* Selection Indicator */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: currentColors.primary }}
            >
              <FiCheck className="w-3 h-3" style={{ color: currentColors.bgPrimary }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Theme Info */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          {getThemeIcon(theme)}
          <span 
            className="font-semibold text-sm"
            style={{ color: currentColors.textPrimary }}
          >
            {themeConfig?.name || theme}
          </span>
        </div>
        <p 
          className="text-xs leading-relaxed"
          style={{ color: currentColors.textSecondary }}
        >
          {themeConfig?.description || 'Theme description'}
        </p>
      </div>
    </motion.button>
  );
};

interface ThemeSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ isOpen, onClose }) => {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>(currentTheme);
  const colors = getThemeColors(currentTheme);

  const handleThemeSelect = (theme: ThemeType) => {
    setSelectedTheme(theme);
    setTheme(theme);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm p-4 sm:p-6 md:p-8"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.3, damping: 25, stiffness: 300 }}
          className="rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: colors.bgPrimary,
            border: `2px solid ${colors.border}`,
            color: colors.textPrimary,
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 0 1px ${colors.border}`,
            minHeight: '500px'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-4 flex-shrink-0">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${colors.primary}, ${colors.primary}dd)`,
                  boxShadow: `0 4px 12px ${colors.primary}30`
                }}
              >
                <FiSettings className="w-6 h-6" style={{ color: colors.bgPrimary }} />
              </div>
              <div>
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: colors.textPrimary }}
                >
                  Theme Settings
                </h2>
                <p 
                  className="text-sm mt-1"
                  style={{ color: colors.textSecondary }}
                >
                  Choose your preferred appearance and experience
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: colors.bgSecondary,
                color: colors.textPrimary,
                border: `1px solid ${colors.border}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.bgTertiary;
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.bgSecondary;
                e.currentTarget.style.transform = 'scale(1)';
              }}
              aria-label="Close theme selector"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Theme Grid - Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
              {availableThemes.map((theme) => (
                <ThemePreview
                  key={theme.value}
                  theme={theme.value}
                  isSelected={selectedTheme === theme.value}
                  onSelect={() => handleThemeSelect(theme.value)}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div 
            className="p-6 pt-4 border-t flex-shrink-0"
            style={{ borderColor: colors.border }}
          >
            <div className="flex items-center justify-between">
              <div 
                className="text-sm"
                style={{ color: colors.textSecondary }}
              >
                Current theme: <span 
                  className="font-semibold ml-1"
                  style={{ color: colors.textPrimary }}
                >
                  {availableThemes.find(t => t.value === currentTheme)?.name}
                </span>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg transition-all duration-200 text-sm font-semibold"
                style={{
                  backgroundColor: colors.primary,
                  color: colors.bgPrimary,
                  boxShadow: `0 2px 8px ${colors.primary}40`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${colors.primary}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 2px 8px ${colors.primary}40`;
                }}
              >
                Apply Changes
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeSelector;
