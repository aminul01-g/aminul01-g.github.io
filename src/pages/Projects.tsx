import React from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects.d';
import ProjectCard from '../components/ProjectCard';
import ProjectFilterBar from '../components/ProjectFilterBar';
import SectionHeading from '../components/SectionHeading';
import { Helmet } from 'react-helmet-async';
import { usePageTracking } from '../hooks/useAnalytics';
import {
  DEFAULT_SORT,
  filterProjects,
  sortProjects,
  type SortBy,
  type SortOrder,
} from '../utils/projectFilters';

const [defaultSortBy, defaultSortOrder] = DEFAULT_SORT.split('-') as [SortBy, SortOrder];

function parseSort(value: string): [SortBy, SortOrder] {
  const [by, order] = value.split('-');
  const allowed: SortBy[] = ['name', 'technology', 'date', 'popularity'];
  return [
    allowed.includes(by as SortBy) ? (by as SortBy) : defaultSortBy,
    order === 'asc' ? 'asc' : 'desc',
  ];
}

/** Query params live after the hash in HashRouter, not in location.search. */
function readParams(): URLSearchParams {
  return new URLSearchParams(window.location.hash.split('?')[1] || '');
}

export default function Projects(): React.ReactElement {
  const [selectedTags, setSelectedTags] = React.useState<string[]>(
    () => readParams().get('filter')?.split(',').filter(Boolean) || []
  );
  const [search, setSearch] = React.useState(() => readParams().get('search') || '');
  const [sort, setSort] = React.useState<[SortBy, SortOrder]>(() =>
    parseSort(readParams().get('sort') || DEFAULT_SORT)
  );

  usePageTracking('/projects', 'Projects');

  // Shareable URLs without a navigate() loop.
  React.useEffect(() => {
    const params = new URLSearchParams();
    if (selectedTags.length) params.set('filter', selectedTags.join(','));
    if (search) params.set('search', search);
    if (sort[0] !== defaultSortBy || sort[1] !== defaultSortOrder) {
      params.set('sort', `${sort[0]}-${sort[1]}`);
    }
    const query = params.toString();
    const base = `${window.location.pathname}${window.location.hash.split('?')[0] || '#/projects'}`;
    const next = `${base}${query ? `?${query}` : ''}`;
    if (`${window.location.pathname}${window.location.hash}` !== next) {
      window.history.replaceState(null, '', next);
    }
  }, [selectedTags, search, sort]);

  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags || []))).sort();

  const visible = React.useMemo(
    () => sortProjects(filterProjects(projects, selectedTags, search), sort[0], sort[1]),
    [selectedTags, search, sort]
  );
  const featured = visible.filter((project) => project.featured);
  const rest = visible.filter((project) => !project.featured);

  const card = (project: Project) => (
    <div key={project.slug} className="h-full" data-testid="project-card">
      <ProjectCard {...project} />
    </div>
  );

  const clearAll = () => {
    setSelectedTags([]);
    setSearch('');
    setSort([defaultSortBy, defaultSortOrder]);
  };

  return (
    <>
      <Helmet>
        <title>Projects | Aminul Islam Bhuiyan Amin</title>
        <meta
          name="description"
          content="A showcase of AI, data science, and full-stack projects by Aminul Islam Bhuiyan Amin."
        />
        <meta property="og:title" content="Projects | Aminul Islam Bhuiyan Amin" />
        <meta
          property="og:description"
          content="A showcase of AI, data science, and full-stack projects by Aminul Islam Bhuiyan Amin."
        />
        <meta property="og:image" content="https://aminul01-g.github.io/logo512.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aminul01-g.github.io/#/projects" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Aminul Islam Bhuiyan Amin" />
        <meta
          name="twitter:description"
          content="A showcase of AI, data science, and full-stack projects by Aminul Islam Bhuiyan Amin."
        />
        <meta name="twitter:image" content="https://aminul01-g.github.io/logo512.png" />
        <link rel="canonical" href="https://aminul01-g.github.io/#/projects" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: "Aminul Islam Bhuiyan Amin's Projects",
            description:
              'A showcase of AI, data science, and full-stack projects by Aminul Islam Bhuiyan Amin.',
            url: 'https://aminul01-g.github.io/#/projects',
            numberOfItems: projects.length,
            itemListElement: projects.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'SoftwareApplication',
                name: project.title,
                description: project.description,
                url: project.github,
                applicationCategory: 'DeveloperApplication',
                operatingSystem: 'Web',
                author: { '@type': 'Person', name: 'Aminul Islam Bhuiyan Amin' },
              },
            })),
          })}
        </script>
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
                item: 'https://aminul01-g.github.io/#/projects',
              },
            ],
          })}
        </script>
      </Helmet>

      <section id="projects" className="relative z-10 w-full px-4 py-10 pb-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            index="04"
            label="Portfolio"
            title="Selected projects."
            description="AI, data science and software engineering work — featured projects first, then the full index."
          />

          <div className="mb-8">
            <ProjectFilterBar
              tags={allTags}
              activeTag={selectedTags[0] || null}
              selectedTags={selectedTags}
              search={search}
              sortBy={sort[0]}
              sortOrder={sort[1]}
              onFilter={setSelectedTags}
              onSearch={setSearch}
              onSort={(by, order) => setSort([by as SortBy, order])}
            />
          </div>

          <p className="mb-8 text-center text-sm text-[var(--muted)]" aria-live="polite">
            Showing {visible.length} of {projects.length} projects
            {(selectedTags.length > 0 || search) && ' (filtered)'}
          </p>

          {visible.length === 0 ? (
            <div className="glass-card rounded-2xl p-10 text-center">
              <p className="mb-2 text-xl font-semibold">No projects found</p>
              <p className="mb-6 text-[var(--muted)]">
                Try a different search or clear the filters.
              </p>
              <button type="button" onClick={clearAll} className="btn">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {featured.length > 0 && (
                <div className="mb-16">
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent-2)]">
                      Featured work
                    </h2>
                    <span className="section-rule flex-1" aria-hidden="true" />
                    <span className="font-mono text-xs text-[var(--muted)]">
                      {String(featured.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {featured.map(card)}
                  </div>
                </div>
              )}

              {rest.length > 0 && (
                <div>
                  <div className="mb-6 flex items-center gap-4">
                    <h2 className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent-2)]">
                      Full index
                    </h2>
                    <span className="section-rule flex-1" aria-hidden="true" />
                    <span className="font-mono text-xs text-[var(--muted)]">
                      {String(rest.length).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {rest.map(card)}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
