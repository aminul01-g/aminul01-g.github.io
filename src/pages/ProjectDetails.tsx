import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { Helmet } from 'react-helmet-async';
import ImageWithFallback from '../components/ImageWithFallback';
import ProjectPlaceholder from '../components/ProjectPlaceholder';
import SocialShare from '../components/SocialShare';
import FeedbackWidget from '../components/FeedbackWidget';

export default function ProjectDetails(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.title.replace(/\s+/g, '-').toLowerCase() === slug);

  if (!project) {
    return (
      <div className="max-w-2xl mx-auto my-16 p-8 GlassCard rounded-2xl text-center">
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
      <section className="max-w-3xl mx-auto my-12 p-8 GlassCard rounded-2xl">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-white/[0.06] text-[#8b5cf6] text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        {/* Dynamic Image/Emoji Rendering */}
        {project.thumbnail &&
        (project.thumbnail.startsWith('http') || project.thumbnail.startsWith('/')) ? (
          <ImageWithFallback
            src={project.thumbnail}
            alt={`${project.title} thumbnail`}
            className="w-full max-w-md rounded-lg mb-6 mx-auto shadow-lg"
            loading="lazy"
          />
        ) : (
          <ProjectPlaceholder
            title={project.title}
            className="w-full max-w-md h-64 rounded-lg mb-6 mx-auto shadow-lg"
          />
        )}

        <p className="text-lg text-[var(--theme-text-primary)] mb-6 leading-relaxed">
          {project.description}
        </p>

        <SocialShare
          url={`https://aminul01-g.github.io/projects/${slug}`}
          title={project.title}
          className="mb-8"
        />

        {/* Case Study Section */}
        {project.caseStudy && (
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'The Problem', icon: '🎯', text: project.caseStudy.problem, color: 'text-red-500' },
              { title: 'The Solution', icon: '💡', text: project.caseStudy.solution, color: 'text-yellow-500' },
              { title: 'The Impact', icon: '🚀', text: project.caseStudy.impact, color: 'text-green-500' },
            ].map((item, i) => (
              <div
                key={i}
                className="GlassCard p-6 rounded-xl hover:transform hover:-translate-y-1 transition duration-300"
              >
                <div className={`text-3xl mb-3 ${item.color}`}>{item.icon}</div>
                <h3 className="text-lg font-bold mb-2 text-[var(--theme-text-primary)]">
                  {item.title}
                </h3>
                <p className="text-[var(--theme-text-primary)] text-opacity-80 text-sm leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Project Details Section */}
        <div className="prose dark:prose-invert max-w-none mb-8">
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-[var(--theme-text-primary)]">Highlights</h2>
              <ul className="list-disc pl-5 space-y-2">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="text-[var(--theme-text-primary)]">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Fallback if no specific details are available */}
          {(!project.highlights || project.highlights.length === 0) && (
            <div className="GlassCard p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-[#8b5cf6] mb-2">
                About this Project
              </h3>
              <p className="text-[var(--theme-text-primary)] text-opacity-[0.60]">
                This project demonstrates key concepts in{' '}
                {project.tags[0] || 'software development'}. Check out the source code on GitHub to
                explore the implementation details, data pipelines, and model architectures used.
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300"
          >
            View on GitHub
          </a>
          <Link
            to="/projects"
            className="GlassCard px-6 py-3 rounded-2xl font-semibold text-[var(--theme-text-primary)] text-opacity-[0.80] hover:text-white hover:border-white/25 transition-all duration-300"
          >
            Back to Projects
          </Link>
        </div>
        <FeedbackWidget className="my-8" />
      </section>
    </>
  );
}
