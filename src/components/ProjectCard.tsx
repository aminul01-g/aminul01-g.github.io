export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github: string;
  thumbnail?: string;
}

export default function ProjectCard({ title, description, tags, github, thumbnail }: ProjectCardProps) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800 transition-colors duration-300 hover:shadow-xl hover:-translate-y-1 transform group">
      {thumbnail && (
        <img src={thumbnail} alt={title + ' thumbnail'} className="w-16 h-16 object-cover rounded mb-2 mx-auto group-hover:scale-105 transition-transform duration-200" />
      )}
      <h3 className="text-xl font-semibold text-primary mb-2 dark:text-primary">{title}</h3>
      <p className="text-gray-700 dark:text-gray-200 mb-2">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <span key={i} className="bg-primary text-white text-xs px-2 py-1 rounded">{tag}</span>
        ))}
      </div>
      <a href={github} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 dark:text-blue-300 underline">View on GitHub</a>
    </div>
  );
}