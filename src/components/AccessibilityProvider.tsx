import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface AccessibilityContextType {
  isReducedMotion: boolean;
  isHighContrast: boolean;
  fontSize: 'small' | 'medium' | 'large';
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
  toggleHighContrast: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

interface AccessibilityProviderProps {
  children: ReactNode;
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps): React.ReactElement {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');

  // Check for user preferences
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleReducedMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleReducedMotionChange);

    // Check for high contrast preference
    const highContrastQuery = window.matchMedia('(prefers-contrast: high)');
    setIsHighContrast(highContrastQuery.matches);

    const handleHighContrastChange = (e: MediaQueryListEvent) => {
      setIsHighContrast(e.matches);
    };

    highContrastQuery.addEventListener('change', handleHighContrastChange);

    // Load saved preferences
    const savedFontSize = localStorage.getItem('fontSize') as 'small' | 'medium' | 'large';
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }

    const savedHighContrast = localStorage.getItem('highContrast');
    if (savedHighContrast) {
      setIsHighContrast(savedHighContrast === 'true');
    }

    return () => {
      mediaQuery.removeEventListener('change', handleReducedMotionChange);
      highContrastQuery.removeEventListener('change', handleHighContrastChange);
    };
  }, []);

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // Apply font size
    root.style.setProperty('--font-size-multiplier', 
      fontSize === 'small' ? '0.875' : 
      fontSize === 'large' ? '1.25' : '1'
    );

    // Apply high contrast
    if (isHighContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply reduced motion
    if (isReducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }
  }, [fontSize, isHighContrast, isReducedMotion]);

  const handleSetFontSize = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
    localStorage.setItem('fontSize', size);
  };

  const handleToggleHighContrast = () => {
    const newValue = !isHighContrast;
    setIsHighContrast(newValue);
    localStorage.setItem('highContrast', newValue.toString());
  };

  const value: AccessibilityContextType = {
    isReducedMotion,
    isHighContrast,
    fontSize,
    setFontSize: handleSetFontSize,
    toggleHighContrast: handleToggleHighContrast,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
} 