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

export default function ProjectCard({ title, description, tags, github, thumbnail }: ProjectCardProps) {
  const logo = thumbnail || projectIcons[title] || '📦';
  const isEmoji = !thumbnail && !!projectIcons[title];

  return (
    <div
      className="group h-full flex flex-col rounded-xl overflow-hidden bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 max-w-full"
      tabIndex={0}
      aria-label={`Project: ${title}`}
      style={{minHeight: 300, width: '100%'}}>
      {/* Project Image/Icon */}
      <div className="relative w-full pt-[56.25%] bg-gradient-to-br from-primary/5 to-indigo-500/5 dark:from-primary/10 dark:to-indigo-500/10">
        <div className="absolute inset-0 flex items-center justify-center">
          {isEmoji ? (
            <span className="text-5xl">{logo}</span>
          ) : (
            <img 
              src={logo} 
              alt={title + ' thumbnail'} 
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
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

        {/* Action Button */}
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 px-4 rounded-lg bg-primary text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
          aria-label={`View ${title} on GitHub`}
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
}