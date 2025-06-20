export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  github: string;
}

export default function ProjectCard({ title, description, tags, github }: ProjectCardProps) {
  return (
    <div className="border rounded-lg shadow p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
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