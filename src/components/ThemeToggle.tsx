import { useState } from 'react';
import ThemeSettingsModal from './ThemeSettingsModal';

export default function ThemeToggle(): React.ReactElement {
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
