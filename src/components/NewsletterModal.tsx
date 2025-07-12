import React, { useEffect, useState, useRef } from 'react';
import { useToast } from './ToastContext';

const NewsletterModal: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useToast();

  // Show modal on exit intent, only once per session
  useEffect(() => {
    const hasShown = sessionStorage.getItem('newsletter_shown');
    if (hasShown) return;
    const handleExitIntent = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setOpen(true);
        sessionStorage.setItem('newsletter_shown', 'true');
      }
    };
    document.addEventListener('mouseleave', handleExitIntent);
    return () => {
      document.removeEventListener('mouseleave', handleExitIntent);
    };
  }, []);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('You are subscribed to the newsletter!', 'success');
    setTimeout(() => setOpen(false), 2000);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-sm w-full relative animate-fadeInUp">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-2xl focus:outline-none"
          aria-label="Close newsletter modal"
        >
          ×
        </button>
        {submitted ? (
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2 text-primary">Thank you!</h3>
            <p className="text-gray-700 dark:text-gray-200">You&apos;re subscribed to updates.</p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            aria-label="Newsletter signup form"
          >
            <h3 className="text-xl font-bold mb-2 text-primary">Subscribe for Updates</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              Get the latest blog posts, projects, and AI insights straight to your inbox.
            </p>
            <input
              ref={inputRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your email address"
              className="border border-primary/30 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Email address"
            />
            <button
              type="submit"
              className="bg-primary text-white font-semibold rounded px-4 py-2 hover:bg-primary-700 transition"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default NewsletterModal;
