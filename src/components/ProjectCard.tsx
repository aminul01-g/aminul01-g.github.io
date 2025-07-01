export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github: string;
  thumbnail?: string;
}

export default function ProjectCard({ title, description, tags, github, thumbnail }: ProjectCardProps) {
  return (
    <div className="border rounded-lg shadow p-4 sm:p-6 bg-white dark:bg-gray-800 transition-colors duration-300 hover:shadow-xl hover:-translate-y-1 transform group relative overflow-hidden">
      {thumbnail && (
        <div className="w-20 h-20 aspect-square flex items-center justify-center mx-auto mb-2 rounded-lg bg-white/80 dark:bg-gray-900/80 border-2 border-primary shadow-lg group-hover:scale-105 transition-transform duration-200">
          <img
            src={thumbnail}
            alt={title + ' thumbnail'}
            className="max-w-[70%] max-h-[70%] object-contain"
            style={{ display: 'block', margin: '0 auto' }}
          />
        </div>
      )}
      <h3 className="text-xl font-semibold text-primary mb-2 dark:text-primary">{title}</h3>
      <p className="text-gray-700 dark:text-gray-200 mb-2 line-clamp-2 group-hover:line-clamp-none transition-all duration-200">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span key={i} className="bg-primary text-white text-xs px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <div className="flex gap-2 w-full">
        <a href={github} target="_blank" rel="noopener noreferrer" className="flex-1 text-center text-sm text-blue-500 dark:text-blue-300 underline py-3 rounded-lg mt-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary bg-blue-50 dark:bg-gray-900/40 hover:bg-blue-100 dark:hover:bg-gray-800/60 transition-all">
          View on GitHub
        </a>
        <a href={github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-primary dark:text-indigo-300 font-semibold py-3 px-4 rounded-lg mt-2 min-h-[44px] focus:outline-none focus:ring-2 focus:ring-primary border border-primary/20 bg-white dark:bg-gray-900/40 hover:bg-primary/10 dark:hover:bg-indigo-900/30 transition-all">
          <span>View Project</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </a>
      </div>
      {/* Reveal full description on hover for accessibility */}
      <div className="sr-only group-hover:not-sr-only absolute left-0 right-0 bottom-0 bg-white/90 dark:bg-gray-900/90 p-4 rounded-b-lg shadow-lg transition-all duration-200">
        {description}
      </div>
    </div>
  );
}