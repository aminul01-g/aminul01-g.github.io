import React, { useEffect, useState } from 'react';

// Type for beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

const AddToHomeScreenPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const promptEvent = e as BeforeInstallPromptEvent;
      promptEvent.preventDefault();
      setDeferredPrompt(promptEvent);
      setVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setVisible(false);
      }
      setDeferredPrompt(null);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-900 shadow-lg rounded-lg px-6 py-4 flex items-center gap-4 z-50 border border-primary">
      <span className="font-semibold text-primary">Install this app for a better experience!</span>
      <button
        onClick={handleInstall}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-700 transition"
      >
        Add to Home Screen
      </button>
      <button
        onClick={() => setVisible(false)}
        className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        aria-label="Dismiss add to home screen prompt"
      >
        ×
      </button>
    </div>
  );
};

export default AddToHomeScreenPrompt; 