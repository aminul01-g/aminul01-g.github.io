import React, { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
  prompt(): Promise<void>;
}

const AddToHomeScreenPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let timer: number | undefined;
    let ready = false;
    const maybeShow = () => {
      if (ready && window.scrollY > window.innerHeight * 0.6) {
        setVisible(true);
        window.removeEventListener('scroll', maybeShow);
      }
    };
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Never cover the hero: wait until a visitor has scrolled past it.
      timer = window.setTimeout(() => {
        ready = true;
        maybeShow();
      }, 3000);
      window.addEventListener('scroll', maybeShow, { passive: true });
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('scroll', maybeShow);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setVisible(false);
    setDeferredPrompt(null);
  };

  if (!visible) return null;

  return (
    <aside
      aria-label="Install app"
      className="glass-card fixed bottom-28 right-4 z-40 w-[min(19rem,calc(100vw-2rem))] rounded-2xl p-4 shadow-glow sm:right-6"
    >
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg opacity-60 transition hover:opacity-100"
        aria-label="Dismiss install prompt"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="pr-8 text-sm font-semibold">Install this portfolio</h2>
      <p className="mt-1 text-xs opacity-70">Keep it one tap away, even offline.</p>
      <button
        type="button"
        onClick={handleInstall}
        className="mt-3 w-full rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
      >
        Add to home screen
      </button>
    </aside>
  );
};

export default AddToHomeScreenPrompt;
