import { Link } from 'react-router-dom';
import type { Project } from '../data/projects.d';

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

/** Editorial project card for the homepage — matches the About section's visual language. */
export default function FeaturedProjectCard({
  project,
  index,
  total,
}: FeaturedProjectCardProps): React.ReactElement {
  const year = project.date ? new Date(project.date).getFullYear() : undefined;

  return (
    <article
      data-testid="project-card"
      className="group flex min-h-[340px] flex-col justify-between rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 transition duration-300 hover:border-[var(--hairline-strong)] hover:shadow-glow"
    >
      <div>
        <div className="flex items-center justify-between font-mono text-[0.68rem] uppercase tracking-[0.18em]">
          <span className="text-[var(--accent-2)]">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
          <span className="text-[var(--muted)]">{year ?? 'Selected work'}</span>
        </div>

        <h3 className="mt-9 text-2xl font-semibold leading-tight tracking-[-0.03em] text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--accent-2)]">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">
          {project.description}
        </p>

        {project.caseStudy?.impact && (
          <p className="mt-5 line-clamp-2 border-l-2 border-[var(--accent-2)]/40 pl-3 text-xs leading-relaxed text-[var(--muted)]">
            <span className="font-mono uppercase tracking-[0.12em] text-[var(--accent-2)]">
              Result{' '}
            </span>
            {project.caseStudy.impact}
          </p>
        )}
      </div>

      <div className="mt-8">
        <div className="flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-[var(--muted)]"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-[var(--hairline)] pt-4">
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] transition-colors hover:text-[var(--accent-2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-2)]"
          >
            View case study
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
            </svg>
          </Link>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--hairline)] text-[var(--muted)] transition hover:border-[var(--hairline-strong)] hover:text-[var(--ink)]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .26.18.57.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
