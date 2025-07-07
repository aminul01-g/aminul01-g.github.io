import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { Helmet } from 'react-helmet-async';

export default function ProjectDetails() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find(p => p.title.replace(/\s+/g, '-').toLowerCase() === slug);

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-6">Sorry, we couldn't find that project.</p>
        <Link to="/projects" className="text-primary underline">Back to Projects</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Project Details | Aminul Islam Bhuiyan Amin</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | Project Details | Aminul Islam Bhuiyan Amin`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:image" content={project.thumbnail} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://aminul01-g.github.io/projects/${slug}`} />
      </Helmet>
      <section className="max-w-3xl mx-auto my-12 p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border border-primary/10 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="bg-primary/10 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 text-xs px-2 py-1 rounded">#{tag}</span>
          ))}
        </div>
        <img src={project.thumbnail} alt={project.title + ' thumbnail'} className="w-full max-w-md rounded-lg mb-6 mx-auto" loading="lazy" />
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">{project.description}</p>
        {/* Placeholder for case study/extended details */}
        <div className="prose dark:prose-invert max-w-none mb-8">
          <h2>Case Study</h2>
          <p>This section can include a detailed write-up, screenshots, challenges, and outcomes for <strong>{project.title}</strong>. You can expand this with markdown or rich content as needed.</p>
        </div>
        <div className="flex gap-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition">View on GitHub</a>
          <Link to="/projects" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition">Back to Projects</Link>
        </div>
      </section>
    </>
  );
}
