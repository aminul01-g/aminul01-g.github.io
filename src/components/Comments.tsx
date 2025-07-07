import React, { useState } from 'react';

interface Comment {
  name: string;
  text: string;
  date: string;
}

export default function Comments({ postSlug }: { postSlug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [form, setForm] = useState({ name: '', text: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.text.trim()) {
      setError('Name and comment are required.');
      return;
    }
    setComments([
      ...comments,
      { name: form.name, text: form.text, date: new Date().toLocaleString() },
    ]);
    setForm({ name: '', text: '' });
  };

  return (
    <section className="max-w-2xl mx-auto my-12 p-6 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg border border-primary/10 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4">Comments</h2>
      <form onSubmit={handleSubmit} className="space-y-3 mb-8" aria-label="Add a comment">
        <div>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded border border-primary/20 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            required
            aria-label="Name"
          />
        </div>
        <div>
          <textarea
            name="text"
            placeholder="Your comment"
            value={form.text}
            onChange={handleChange}
            className="w-full p-2 rounded border border-primary/20 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary"
            rows={3}
            required
            aria-label="Comment"
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-indigo-600 transition">Post Comment</button>
      </form>
      <div>
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="space-y-4">
            {comments.map((c, i) => (
              <li key={i} className="border-b border-gray-200 dark:border-gray-700 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-primary dark:text-indigo-300">{c.name}</span>
                  <span className="text-xs text-gray-400">{c.date}</span>
                </div>
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{c.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
