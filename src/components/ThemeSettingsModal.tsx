import React, { useState } from 'react';

const themes = [
  { name: 'System', value: 'system' },
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'Amoled', value: 'amoled' },
  { name: 'Nord', value: 'nord' },
  { name: 'Solarized', value: 'solarized' },
];

export default function ThemeSettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}): React.ReactElement | null {
  const [selected, setSelected] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'system';
    }
    return 'system';
  });

  function applyTheme(theme: string) {
    setSelected(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('dark', 'amoled', 'nord', 'solarized');
    if (theme === 'dark' || theme === 'amoled' || theme === 'nord' || theme === 'solarized') {
      document.documentElement.classList.add(theme);
    }
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
    onClose();
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 w-full max-w-xs relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg" aria-label="Close">
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary dark:text-indigo-300">Theme Settings</h2>
        <ul className="space-y-2">
          {themes.map((theme) => (
            <li key={theme.value}>
              <button
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${selected === theme.value ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'}`}
                onClick={() => applyTheme(theme.value)}
                aria-pressed={selected === theme.value}
              >
                {theme.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
