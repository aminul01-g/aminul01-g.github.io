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
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass-card shadow-xl rounded-2xl p-4 flex flex-col gap-3 z-50 border border-gray-100 dark:border-gray-700 max-w-sm animate-in fade-in duration-500">
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-semibold text-[var(--theme-text-primary)] mb-1">Install App</h3>
          <p className="text-sm text-[var(--theme-text-primary)] text-opacity-80">Install for a better experience!</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-[var(--theme-text-primary)] text-opacity-70 hover:text-[var(--theme-text-primary)] text-opacity-60 dark:hover:text-[var(--theme-text-primary)] text-opacity-90 transition-colors p-1"
          aria-label="Dismiss"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <button
        onClick={handleInstall}
        className="w-full bg-primary hover:bg-primary-600 text-white font-medium py-2 px-4 rounded-xl transition-colors text-sm"
      >
        Add to Home Screen
      </button>
    </div>
  );
};

export default AddToHomeScreenPrompt;
