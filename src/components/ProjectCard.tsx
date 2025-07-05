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
  // Choose thumbnail if provided, else use emoji/icon fallback
  const logo = thumbnail || projectIcons[title] || '📦';
  const isEmoji = !thumbnail && !!projectIcons[title];
  return (
    <div
      className="project-card border rounded-lg shadow p-4 sm:p-6 bg-white dark:bg-gray-800 transition-all duration-300 group relative overflow-hidden focus-within:ring-2 focus-within:ring-primary focus-within:outline-none hover:border-primary hover:shadow-lg hover:ring-2 hover:ring-primary/30 w-full min-w-0 flex flex-col justify-between"
      style={{ minHeight: '220px' }}
      tabIndex={0}
      aria-label={`Project: ${title}`}
    >
      <div className="w-20 h-20 aspect-square flex items-center justify-center mx-auto mb-2 rounded-lg bg-white/80 dark:bg-gray-900/80 border-2 border-primary shadow-lg group-hover:scale-105 transition-transform duration-200 text-4xl select-none">
        {isEmoji ? logo : <img src={logo} alt={title + ' thumbnail'} className="max-w-[70%] max-h-[70%] object-contain" style={{ display: 'block', margin: '0 auto' }} />}
      </div>
      <h3 className="text-xl font-semibold text-primary mb-2 dark:text-primary">{title}</h3>
      <p className="text-gray-700 dark:text-gray-200 mb-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-200">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span key={i} className="themed-badge themed-badge-blue text-xs px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <div className="flex gap-2 w-full">
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 themed-badge themed-badge-blue text-center text-sm underline py-3 rounded-lg mt-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          tabIndex={0}
          aria-label={`View ${title} on GitHub`}
        >
          View on GitHub
        </a>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 themed-badge themed-badge-yellow text-sm font-semibold py-3 px-4 rounded-lg mt-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 transition-all"
          tabIndex={0}
          aria-label={`View project: ${title}`}
        >
          <span>View Project</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>
      {/* ...removed hover description overlay... */}
    </div>
  );
}