import React from 'react';
import ImageWithFallback from './ImageWithFallback';
import { Link } from 'react-router-dom';

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github: string;
  thumbnail?: string;
}

// Emoji/icon fallback for project logos by title keyword
const projectIcons: Record<string, string> = {
  aiStudyAssistant: '🤖',
  LearnML: '📚',
  'Predictive Modeling of Ames Housing Data': '🏠',
  'titanic-survival-app': '🚢',
};

export default function ProjectCard({
  title,
  description,
  tags,
  github,
  thumbnail,
}: ProjectCardProps): React.ReactElement {
  const logo = thumbnail || projectIcons[title] || '📦';
  const isEmoji = !thumbnail && !!projectIcons[title];

  return (
    <div
      className="group h-full flex flex-col rounded-xl overflow-hidden bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-full focus:outline-none focus:ring-2 focus:ring-primary-400"
      aria-label={`Project: ${title}`}
      role="article"
      style={{ minHeight: 300, width: '100%' }}
    >
      {/* Project Image/Icon */}
      <div className="relative w-full pt-[56.25%] bg-gradient-to-br from-primary/5 to-indigo-500/5 dark:from-primary/10 dark:to-indigo-500/10">
        <div className="absolute inset-0 flex items-center justify-center">
          {isEmoji ? (
            <span className="text-5xl">{logo}</span>
          ) : (
            <ImageWithFallback
              src={logo}
              alt={`${title} thumbnail`}
              webp={`/images/optimized/${logo
                ?.split('/')
                .pop()
                ?.replace(/\.[^.]+$/, '.webp')}`}
              avif={`/images/optimized/${logo
                ?.split('/')
                .pop()
                ?.replace(/\.[^.]+$/, '.avif')}`}
              className="w-full h-full object-cover rounded-t-xl"
              loading="lazy"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 sm:p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 group-hover:line-clamp-none transition-all duration-200">
          {description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Link
            to={`/projects/${encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase())}`}
            className="flex-1 block text-center py-3 px-4 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none transition-colors duration-200"
            aria-label={`View details for ${title}`}
          >
            View Details
          </Link>
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 block text-center py-3 px-4 rounded-lg bg-primary text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none transition-colors duration-200"
            aria-label={`View ${title} on GitHub`}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
