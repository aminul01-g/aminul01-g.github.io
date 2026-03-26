import React, { useState } from 'react';

export const InteractiveCounter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 glass-card rounded-xl border-2 border-primary/20 shadow-lg text-center my-8 max-w-sm mx-auto">
      <h3 className="text-lg font-bold mb-4 text-[var(--theme-text-primary)]">Interactive Demo</h3>
      <div className="text-4xl font-mono font-bold text-primary mb-6">{count}</div>
      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setCount(count - 1)}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          -
        </button>
        <button
          onClick={() => setCount(count + 1)}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-md"
        >
          + Check It Out
        </button>
      </div>
      <p className="mt-4 text-xs text-[var(--theme-text-primary)] text-opacity-60">
        This is a real React component running inside the blog post!
      </p>
    </div>
  );
};
