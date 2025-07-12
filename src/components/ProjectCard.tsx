import { motion } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';
import { Link } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';

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
  'Diabetes-Detection-System': '🏥',
  Learn_AI_Engineering: '🧠',
  'linux-tools': '🐧',
  pythonProjects: '🐍',
};

export default function ProjectCard({
  title,
  description,
  tags,
  github,
  thumbnail,
}: ProjectCardProps): React.ReactElement {
  const logo = thumbnail || projectIcons[title] || '📦';
  const isEmoji = !thumbnail?.startsWith('http') && (!!projectIcons[title] || logo.length <= 2);
  const { trackProjectView, trackEvent } = useAnalytics();

  const handleViewDetails = () => {
    trackProjectView(title);
  };

  const handleGitHubClick = () => {
    trackEvent('github_click', 'engagement', title);
  };

  return (
    <motion.div
      className="group h-full flex flex-col rounded-2xl overflow-hidden glass-card backdrop-blur-xl border border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] max-w-full focus:outline-none focus:ring-2 focus:ring-primary-400"
      aria-label={`Project: ${title}`}
      role="article"
      style={{ minHeight: 350, width: '100%' }}
      whileHover={{ 
        scale: 1.02,
        rotateY: 5,
        rotateX: 2,
      }}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Project Image/Icon with Enhanced Styling */}
      <div className="relative w-full pt-[56.25%] bg-gradient-to-br from-primary/10 to-indigo-500/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {isEmoji ? (
            <motion.span 
              className="text-6xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              {logo}
            </motion.span>
          ) : (
            <ImageWithFallback
              src={logo}
              alt={`${title} thumbnail`}
              className="w-full h-full object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-110 mx-auto"
              loading="lazy"
            />
          )}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-indigo-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content with Enhanced Styling */}
      <div className="flex-1 p-6 sm:p-8 relative z-10">
        <motion.h3 
          className="text-xl font-bold text-glass dark:text-white mb-3 line-clamp-1 group-hover:text-primary-300 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>

        <p className="text-gray-700 dark:text-gray-300 mb-6 line-clamp-3 group-hover:line-clamp-none transition-all duration-300 leading-relaxed">
          {description}
        </p>

        {/* Enhanced Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, i) => (
            <motion.span
              key={i}
              className="px-3 py-1 text-xs font-medium rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-sm text-glass dark:text-white border border-black/10 dark:border-white/20 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              #{tag}
            </motion.span>
          ))}
        </div>

        {/* Enhanced Action Buttons */}
        <div className="flex gap-3 mt-auto">
          <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to={`/projects/${encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase())}`}
              className="block w-full text-center py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-indigo-500 text-white hover:from-primary-600 hover:to-indigo-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              aria-label={`View details for ${title}`}
              onClick={handleViewDetails}
            >
              <span className="flex items-center justify-center gap-2">
                View Details
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </span>
            </Link>
          </motion.div>
          
          <motion.div className="flex-1" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 px-4 rounded-xl glass-card backdrop-blur-sm text-white hover:bg-white/20 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:outline-none transition-all duration-300 transform hover:scale-105 hover:shadow-lg border border-white/20"
              aria-label={`View ${title} on GitHub`}
              onClick={handleGitHubClick}
            >
              <span className="flex items-center justify-center gap-2">
                GitHub
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
              </span>
            </a>
          </motion.div>
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 right-4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-1 h-1 bg-indigo-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-6 w-1.5 h-1.5 bg-cyan-400/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>
    </motion.div>
  );
}
