import { useEffect, useState } from 'react';
import ThemeSettingsModal from './ThemeSettingsModal';

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
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="ml-2 p-1 text-sm border rounded dark:border-white dark:text-white text-black bg-gray-200 dark:bg-gray-700"
        aria-label="Change theme"
        title="Change theme"
      >
        🎨
      </button>
      <ThemeSettingsModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}