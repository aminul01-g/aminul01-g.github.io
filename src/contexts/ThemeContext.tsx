import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type ThemeType =
  | 'system'
  | 'light'
  | 'dark'
  | 'amoled'
  | 'nord'
  | 'solarized'
  | 'high-contrast';

interface ThemeConfig {
  name: string;
  value: ThemeType;
  description: string;
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export const themeConfigs: Record<ThemeType, ThemeConfig> = {
  system: {
    name: 'System',
    value: 'system',
    description: 'Follow system preference',
    primaryColor: '#7c3aed',
    backgroundColor: 'auto',
    textColor: 'auto',
    accentColor: '#a78bfa',
  },
  light: {
    name: 'Light',
    value: 'light',
    description: 'Clean and bright',
    primaryColor: '#7c3aed',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#a78bfa',
  },
  dark: {
    name: 'Dark',
    value: 'dark',
    description: 'Easy on the eyes',
    primaryColor: '#a78bfa',
    backgroundColor: '#1f2937',
    textColor: '#f9fafb',
    accentColor: '#7c3aed',
  },
  amoled: {
    name: 'Amoled',
    value: 'amoled',
    description: 'Pure black for OLED',
    primaryColor: '#00ffe7',
    backgroundColor: '#000000',
    textColor: '#f3f4f6',
    accentColor: '#7c3aed',
  },
  nord: {
    name: 'Nord',
    value: 'nord',
    description: 'Arctic inspired',
    primaryColor: '#88c0d0',
    backgroundColor: '#2e3440',
    textColor: '#eceff4',
    accentColor: '#5e81ac',
  },
  solarized: {
    name: 'Solarized',
    value: 'solarized',
    description: 'Precision colors',
    primaryColor: '#b58900',
    backgroundColor: '#002b36',
    textColor: '#fdf6e3',
    accentColor: '#268bd2',
  },
  'high-contrast': {
    name: 'High Contrast',
    value: 'high-contrast',
    description: 'Maximum accessibility',
    primaryColor: '#0000ff',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    accentColor: '#ff0000',
  },
};

interface ThemeContextType {
  currentTheme: ThemeType;
  themeConfig: ThemeConfig;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
  availableThemes: ThemeConfig[];
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps): React.ReactElement {
  const [currentTheme, setCurrentTheme] = useState<ThemeType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as ThemeType;
      if (saved && Object.keys(themeConfigs).includes(saved)) {
        return saved;
      }
      return 'system';
    }
    return 'system';
  });

  const [systemPrefersDark, setSystemPrefersDark] = useState(false);

  // Monitor system theme preference
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPrefersDark(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPrefersDark(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;

    // Remove all theme classes
    Object.values(themeConfigs).forEach((config) => {
      root.classList.remove(config.value);
    });

    let effectiveTheme = currentTheme;

    // Handle system theme
    if (currentTheme === 'system') {
      effectiveTheme = systemPrefersDark ? 'dark' : 'light';
    }

    // Apply theme class
    if (effectiveTheme !== 'light') {
      root.classList.add(effectiveTheme);
    }

    // Set CSS custom properties
    const config = themeConfigs[effectiveTheme];
    if (config.backgroundColor !== 'auto') {
      root.style.setProperty('--theme-bg', config.backgroundColor);
      root.style.setProperty('--theme-text', config.textColor);
      root.style.setProperty('--theme-primary', config.primaryColor);
      root.style.setProperty('--theme-accent', config.accentColor);
    }

    // Save to localStorage
    localStorage.setItem('theme', currentTheme);

    // Set data attribute for CSS targeting
    root.setAttribute('data-theme', effectiveTheme);
  }, [currentTheme, systemPrefersDark]);

  const setTheme = (theme: ThemeType) => {
    setCurrentTheme(theme);
  };

  const toggleTheme = () => {
    const themes: ThemeType[] = ['light', 'dark', 'amoled', 'nord', 'solarized', 'high-contrast'];
    const currentIndex = themes.indexOf(
      currentTheme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : currentTheme
    );
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const effectiveTheme =
    currentTheme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : currentTheme;
  const themeConfig = themeConfigs[effectiveTheme];
  const isDarkMode = ['dark', 'amoled', 'nord', 'solarized'].includes(effectiveTheme);

  const value: ThemeContextType = {
    currentTheme,
    themeConfig,
    setTheme,
    toggleTheme,
    availableThemes: Object.values(themeConfigs),
    isDarkMode,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
