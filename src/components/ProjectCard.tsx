import { motion, AnimatePresence } from 'framer-motion';
import ImageWithFallback from './ImageWithFallback';
import { Link } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';
import Button from './Button';
import React, { useState, useEffect } from 'react';

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github: string;
  thumbnail?: string;
  videoUrl?: string;
}

// Enhanced project icons with better visual representation
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
  videoUrl,
}: ProjectCardProps): React.ReactElement {
  const logo = thumbnail || projectIcons[title] || '📦';
  const isEmoji = !thumbnail?.startsWith('http') && (!!projectIcons[title] || logo.length <= 2);
  const { trackProjectView, trackEvent } = useAnalytics();
  const [showVideo, setShowVideo] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide logic: When hovered or in view? User said "when a user will look at the card"
  // Let's interpret this as "when hovered" -> start timer.
  // OR "when in view" -> start timer.
  // "Thumbneal will show for some time then it will automatically silde to the video slide"
  // I'll make it trigger on hover to be less intrusive, or I can use a simpler
  // "preview on hover" logic.
  // BUT the user specifically asked for "slide 1... slide 2... automatically slide".
  // Let's do it on Hover for now, as constant auto-sliding of multiple cards is bad UX.
  // Actually, let's use a visibility check so it feels "automatic when looked at".

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHovered && videoUrl) {
      timer = setTimeout(() => {
        setShowVideo(true);
      }, 300); // 0.3s delay before showing video
    } else {
      setShowVideo(false);
    }
    return () => clearTimeout(timer);
  }, [isHovered, videoUrl]);

  const handleViewDetails = () => {
    trackProjectView(title);
  };

  const handleGitHubClick = () => {
    trackEvent('github_click', 'engagement', title);
  };

  return (
    <motion.article
      className="group h-full flex flex-col glass-card backdrop-blur-enhanced border-gradient shadow-glass hover:shadow-glow transition-all duration-500 card-hover focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-2xl overflow-hidden"
      aria-label={`Project: ${title}`}
      role="article"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      }}
      transition={{
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1,
      }}
      viewport={{ once: true, margin: '-50px' }}
    >
      {/* Enhanced Project Image/Icon */}
      {/* Enhanced Project Media Slider */}
      <div className="relative w-full h-48 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 overflow-hidden">
        <AnimatePresence mode="wait">
          {!showVideo || !videoUrl ? (
            <motion.div
              key="thumbnail"
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              initial={{ x: 0, opacity: 1 }}
              exit={{ x: '-100%', opacity: 0 }}
              transition={{ duration: 0.5 }}
              onClick={() => videoUrl && setShowVideo(true)}
            >
              {isEmoji ? (
                <motion.div
                  className="text-6xl filter drop-shadow-lg"
                  whileHover={{
                    scale: 1.2,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.5 },
                  }}
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {logo}
                </motion.div>
              ) : (
                <ImageWithFallback
                  src={logo}
                  alt={`${title} thumbnail`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              )}
              {/* Enhanced gradient overlays for thumbnail */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
              {/* Floating particles for thumbnail */}
              <div className="absolute inset-0 pointer-events-none">
                <motion.div
                  className="absolute top-4 right-4 w-2 h-2 bg-primary/50 rounded-full"
                  animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-secondary/50 rounded-full"
                  animate={{ y: [0, -8, 0], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="video"
              className="absolute inset-0 bg-black"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <video
                src={videoUrl}
                className="w-full h-full object-cover"
                controls
                playsInline
                controlsList="nodownload"
              >
                <track kind="captions" />
              </video>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Content Section */}
      <div className="flex-1 p-6 relative z-10 flex flex-col">
        <motion.h3
          className="text-xl font-display font-bold text-gray-800 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {title}
        </motion.h3>

        <motion.p
          className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 leading-relaxed flex-grow"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {description}
        </motion.p>

        {/* Enhanced Tags with better animations */}
        <motion.div
          className="flex flex-wrap gap-2 mb-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {tags.slice(0, 4).map((tag, i) => (
            <motion.span
              key={i}
              className="px-3 py-1.5 text-xs font-medium rounded-full glass-card backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/20 hover:border-primary/40 hover:text-primary transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 },
              }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              #{tag}
            </motion.span>
          ))}
          {tags.length > 4 && (
            <motion.span
              className="px-3 py-1.5 text-xs font-medium rounded-full glass-card backdrop-blur-sm text-gray-500 dark:text-gray-400 border border-white/10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              +{tags.length - 4} more
            </motion.span>
          )}
        </motion.div>

        {/* Enhanced Action Buttons */}
        <motion.div
          className="flex gap-3 mt-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex-1">
            <Link
              to={`/projects/${encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase())}`}
              onClick={handleViewDetails}
              className="block w-full"
            >
              <Button
                variant="primary"
                size="md"
                className="w-full"
                icon={
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                }
                iconPosition="right"
              >
                View Details
              </Button>
            </Link>
          </div>

          <div className="flex-1">
            <Button
              variant="glass"
              size="md"
              className="w-full"
              icon={
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                </svg>
              }
              onClick={() => {
                window.open(github, '_blank');
                handleGitHubClick();
              }}
            >
              GitHub
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Enhanced border glow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        animate={{
          borderColor: [
            'rgba(99, 102, 241, 0.2)',
            'rgba(139, 92, 246, 0.3)',
            'rgba(99, 102, 241, 0.2)',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.article>
  );
}
