import React from 'react';

export default function ProjectCardSkeleton(): React.ReactElement {
  return (
    <div className="animate-pulse h-full flex flex-col rounded-xl overflow-hidden bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-lg max-w-full">
      <div className="relative w-full pt-[56.25%] bg-gray-200 dark:bg-gray-700" />
      <div className="flex-1 p-4 sm:p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3 mb-3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
          <div className="h-6 w-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
        </div>
        <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded-lg w-full" />
      </div>
    </div>
  );
}
