import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { Helmet } from 'react-helmet-async';
import ImageWithFallback from '../components/ImageWithFallback';
import SocialShare from '../components/SocialShare';
import FeedbackWidget from '../components/FeedbackWidget';

export default function ProjectDetails(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.title.replace(/\s+/g, '-').toLowerCase() === slug);

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
        <p className="mb-6">Sorry, we couldn&apos;t find that project.</p>
        <Link to="/projects" className="text-primary underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project?.title || 'Project'} | Aminul Islam Bhuiyan Amin</title>
        <meta
          name="description"
          content={project?.description || 'Project by Aminul Islam Bhuiyan Amin.'}
        />
        <meta property="og:title" content={project?.title || 'Project'} />
        <meta
          property="og:description"
          content={project?.description || 'Project by Aminul Islam Bhuiyan Amin.'}
        />
        <meta property="og:image" content="https://aminul01-g.github.io/logo512.png" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://aminul01-g.github.io/projects/${slug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={project?.title || 'Project'} />
        <meta
          name="twitter:description"
          content={project?.description || 'Project by Aminul Islam Bhuiyan Amin.'}
        />
        <meta name="twitter:image" content="https://aminul01-g.github.io/logo512.png" />
        <link rel="canonical" href={`https://aminul01-g.github.io/projects/${slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://aminul01-g.github.io/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Projects',
                item: 'https://aminul01-g.github.io/projects',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: project.title,
                item: `https://aminul01-g.github.io/projects/${slug}`,
              },
            ],
          })}
        </script>
      </Helmet>
      <section className="max-w-3xl mx-auto my-12 p-8 bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border border-primary/10 dark:border-gray-700">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        {/* Dynamic Image/Emoji Rendering */}
        {project.thumbnail && (project.thumbnail.startsWith('http') || project.thumbnail.startsWith('/')) ? (
          <ImageWithFallback
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            className="w-full max-w-md rounded-lg mb-6 mx-auto shadow-lg"
            loading="lazy"
          />
        ) : (
          <div className="text-9xl text-center mb-8 animate-bounce-slow">
            {project.thumbnail || '📁'}
          </div>
        )}

        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed">
          {project.description}
        </p>

        <SocialShare
          url={`https://aminul01-g.github.io/projects/${slug}`}
          title={project.title}
          className="mb-8"
        />

        {/* Dynamic Project Details Section */}
        <div className="prose dark:prose-invert max-w-none mb-8">
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Highlights</h2>
              <ul className="list-disc pl-5 space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-700 dark:text-gray-300">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fallback if no specific details are available */}
          {(!project.highlights || project.highlights.length === 0) && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl border border-blue-100 dark:border-blue-800">
              <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-2">
                About this Project
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                This project demonstrates key concepts in {project.tags[0] || 'software development'}.
                Check out the source code on GitHub to explore the implementation details,
                data pipelines, and model architectures used.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 transition"
          >
            View on GitHub
          </a>
          <Link
            to="/projects"
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Back to Projects
          </Link>
        </div>
        <FeedbackWidget className="my-8" />
      </section>
    </>
  );
}
