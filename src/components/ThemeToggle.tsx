import { useEffect, useState } from 'react';

function getInitialTheme() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs === 'dark';
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return true;
    }
  }
  return false;
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    window.localStorage.setItem('theme', dark ? 'dark' : 'light');
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="ml-2 p-1 text-sm border rounded dark:border-white dark:text-white text-black bg-gray-200 dark:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {dark ? '🌙' : '☀️'}
    </button>
  );
}