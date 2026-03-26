import React, { useEffect, useState } from 'react';

const BackToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={handleClick}
      className="glass-card text-[var(--theme-text-primary)] rounded-full p-2.5 sm:p-3 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 z-50 flex items-center justify-center border border-[var(--glass-border)]"
      aria-label="Back to top"
      tabIndex={0}
      style={{ backdropFilter: 'var(--glass-blur)' }}
    >
      <svg
        className="w-4 h-4 sm:w-5 sm:h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default BackToTopButton;
