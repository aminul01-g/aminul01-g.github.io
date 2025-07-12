import React, { useState } from 'react';
import { useToast } from './ToastContext';

const FeedbackWidget: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useToast();

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Thank you for your feedback!', 'success');
    // Optionally, send feedback to an API here
  };

  if (submitted) {
    return (
      <div
        className={`rounded-lg bg-green-50 dark:bg-green-900/30 p-4 text-center ${className}`}
        role="status"
        aria-live="polite"
      >
        <span className="text-green-700 dark:text-green-200 font-semibold">
          Thank you for your feedback!
        </span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`rounded-lg bg-white dark:bg-gray-900/30 p-4 shadow-md flex flex-col items-center gap-3 ${className}`}
      aria-label="Feedback form"
    >
      <span className="font-semibold text-primary">Was this page helpful?</span>
      <div className="flex gap-4">
        <button
          type="button"
          className={`text-2xl px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${feedback === 'up' ? 'bg-green-100 dark:bg-green-900/40' : ''}`}
          aria-label="Yes, this page was helpful"
          onClick={() => handleFeedback('up')}
        >
          👍
        </button>
        <button
          type="button"
          className={`text-2xl px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary ${feedback === 'down' ? 'bg-red-100 dark:bg-red-900/40' : ''}`}
          aria-label="No, this page was not helpful"
          onClick={() => handleFeedback('down')}
        >
          👎
        </button>
      </div>
      <textarea
        className="w-full mt-2 p-2 border border-primary/20 rounded focus:outline-none focus:ring-2 focus:ring-primary text-sm"
        placeholder="Optional: Tell us how we can improve."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={2}
        aria-label="Additional comments"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded font-semibold hover:bg-primary-700 transition mt-2"
        disabled={!feedback}
      >
        Submit
      </button>
    </form>
  );
};

export default FeedbackWidget;
