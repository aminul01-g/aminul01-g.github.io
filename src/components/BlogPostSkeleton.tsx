import React from 'react';

const BlogPostSkeleton: React.FC = () => (
  <article
    className="prose dark:prose-invert max-w-3xl mx-auto my-8 animate-pulse"
    aria-busy="true"
    aria-label="Loading blog post content"
    role="status"
  >
    <div className="h-10 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
    <div className="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    <div className="flex gap-2 mb-4">
      <div className="h-6 w-16 bg-primary/10 dark:bg-indigo-900/30 rounded-full" />
      <div className="h-6 w-12 bg-primary/10 dark:bg-indigo-900/30 rounded-full" />
    </div>
    <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    <div className="h-6 w-4/6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    <div className="h-6 w-3/6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    <div className="h-6 w-2/6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
    <div className="h-10 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mt-6" />
  </article>
);

export default BlogPostSkeleton;
