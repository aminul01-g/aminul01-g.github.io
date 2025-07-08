import React from 'react';

export default function ResumeModal({
  open,
  onClose,
  resumeUrl,
}: {
  open: boolean;
  onClose: () => void;
  resumeUrl: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 w-full max-w-2xl relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg" aria-label="Close">
          ×
        </button>
        <h2 className="text-xl font-bold mb-4 text-primary dark:text-indigo-300">My Resume</h2>
        <iframe
          src={resumeUrl}
          title="Resume PDF"
          className="w-full h-[60vh] rounded-lg border border-primary/10 dark:border-gray-700 bg-white dark:bg-gray-900"
        />
        <a
          href={resumeUrl}
          download
          className="mt-4 inline-block btn bg-gradient-to-r from-primary to-indigo-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-indigo-200 dark:hover:shadow-indigo-900 transition-transform duration-200"
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}
