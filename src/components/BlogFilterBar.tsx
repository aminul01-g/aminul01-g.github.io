import React, { useState } from 'react';

export default function BlogFilterBar({
  tags,
  onFilter,
  onSearch,
  activeTag,
}: {
  tags: string[];
  onFilter: (tag: string | null) => void;
  onSearch: (q: string) => void;
  activeTag?: string | null;
}): React.ReactElement {
  const [search, setSearch] = useState('');
  return (
    <div className="flex flex-wrap gap-2 items-center mb-6">
      <input
        type="text"
        placeholder="Search blog posts..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
        className="px-3 py-2 rounded-lg border border-primary/20 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Search blog posts"
      />
      <span className="ml-4 text-sm text-gray-500 dark:text-gray-400">Filter by tag:</span>
      <div className="flex gap-2 flex-wrap">
        <button
          className={`px-3 py-1 rounded-full font-semibold text-xs transition-all ${!activeTag ? 'bg-primary text-white dark:bg-indigo-700' : 'bg-primary/10 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 hover:bg-primary/20 dark:hover:bg-indigo-900/50'}`}
          onClick={() => onFilter(null)}
          aria-label="Show all posts"
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full font-semibold text-xs transition-all ${activeTag === tag ? 'bg-primary text-white dark:bg-indigo-700' : 'bg-primary/10 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 hover:bg-primary/20 dark:hover:bg-indigo-900/50'}`}
            onClick={() => onFilter(tag)}
            aria-label={`Filter by ${tag}`}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
