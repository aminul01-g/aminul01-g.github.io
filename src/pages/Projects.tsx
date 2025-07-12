import React from 'react';
import { projects, Project } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ProjectCardSkeleton from '../components/ProjectCardSkeleton';
import ProjectFilterBar from '../components/ProjectFilterBar';
import { motion, useInView } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { usePageTracking } from '../hooks/useAnalytics';

export default function Projects(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Read filter from query params on mount
  const params = new URLSearchParams(location.search);
  const initialFilter = params.get('filter')?.split(',') || [];
  const initialSearch = params.get('search') || '';
  const initialSort = params.get('sort') || 'name-asc';
  
  const [selectedTags, setSelectedTags] = React.useState<string[]>(initialFilter);
  const [search, setSearch] = React.useState(initialSearch);
  const [sortBy, setSortBy] = React.useState(initialSort.split('-')[0]);
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>(initialSort.split('-')[1] as 'asc' | 'desc');
  const [loading, setLoading] = React.useState(true);

  // Track page view
  usePageTracking('/projects', 'Projects');

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  // Update URL when filters change
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    if (selectedTags.length > 0) {
      params.set('filter', selectedTags.join(','));
    } else {
      params.delete('filter');
    }
    
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    
    if (sortBy !== 'date' || sortOrder !== 'desc') {
      params.set('sort', `${sortBy}-${sortOrder}`);
    } else {
      params.delete('sort');
    }
    
    navigate({ search: params.toString() }, { replace: true });
  }, [selectedTags, search, sortBy, sortOrder, navigate, location.search]);

  React.useEffect(() => {
    // Simulate loading delay for skeleton demo (replace with real loading logic if needed)
    const timeout = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags || [])));

  // Enhanced filtering and sorting
  const filteredAndSortedProjects = React.useMemo(() => {
    const filtered = projects.filter((project) => {
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => (project.tags || []).includes(tag));
      
      const matchesSearch = !search || 
        (project.title + project.description + (project.tags || []).join(' '))
          .toLowerCase()
          .includes(search.toLowerCase());
      
      return matchesTags && matchesSearch;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aValue: string | number = '', bValue: string | number = '';
      switch (sortBy) {
        case 'name':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'technology':
          aValue = (a.tags || []).join(' ').toLowerCase();
          bValue = (b.tags || []).join(' ').toLowerCase();
          break;
        default:
          return 0;
      }
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [projects, selectedTags, search, sortBy, sortOrder]);

  // --- Improved fix for framer-motion initial animation sticking on mobile ---
  const sectionRef = React.useRef(null);
  // Try a more forgiving threshold and margin for mobile quirks
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.01,
    margin: '0px 0px -100px 0px',
  });
  // Debug: log inView state
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('Projects isInView:', isInView);
  }, [isInView]);

  return (
    <>
      <Helmet>
        <title>Projects | Aminul Islam Bhuiyan Amin</title>
        <meta name="description" content="A showcase of AI, data science, and full-stack projects by Aminul Islam Bhuiyan Amin." />
        <meta property="og:title" content="Projects | Aminul Islam Bhuiyan Amin" />
        <meta property="og:description" content="A showcase of AI, data science, and full-stack projects by Aminul Islam Bhuiyan Amin." />
        <meta property="og:image" content="https://aminul01-g.github.io/logo512.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aminul01-g.github.io/projects" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Projects | Aminul Islam Bhuiyan Amin" />
        <meta name="twitter:description" content="A showcase of AI, data science, and full-stack projects by Aminul Islam Bhuiyan Amin." />
        <meta name="twitter:image" content="https://aminul01-g.github.io/logo512.png" />
        <link rel="canonical" href="https://aminul01-g.github.io/projects" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "Aminul Islam Bhuiyan Amin's Projects",
            "description": "A showcase of AI, data science, and full-stack projects by Aminul Islam Bhuiyan Amin.",
            "url": "https://aminul01-g.github.io/projects",
            "numberOfItems": projects.length,
            "itemListElement": projects.map((project, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "SoftwareApplication",
                "name": project.title,
                "description": project.description,
                "url": project.github,
                "applicationCategory": "DeveloperApplication",
                "operatingSystem": "Web",
                "author": {
                  "@type": "Person",
                  "name": "Aminul Islam Bhuiyan Amin"
                }
              }
            }))
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://aminul01-g.github.io/'
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Projects',
                item: 'https://aminul01-g.github.io/projects'
              }
            ]
          })}
        </script>
      </Helmet>
      <motion.section
        ref={sectionRef}
        id="projects"
        className="w-full min-h-screen px-2 sm:px-4 py-6 sm:py-8 bg-white dark:bg-black"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.7 }}
      >
        <div className="flex flex-col items-center justify-center gap-2 mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-500 dark:from-primary dark:to-indigo-300 drop-shadow-lg">
            <span className="inline-block align-middle">🚀</span> Projects
          </h2>
          <p className="text-center text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto font-medium">
            A showcase of my favorite projects, spanning{' '}
            <span className="text-primary font-semibold">AI</span>,{' '}
            <span className="text-indigo-500 font-semibold">data science</span>, and{' '}
            <span className="text-pink-500 font-semibold">full-stack development</span>.
            <br className="hidden sm:block" /> Each project reflects my passion for building
            intelligent, impactful solutions.
          </p>
        </div>
        
        {/* Enhanced Filter Bar */}
        <div className="mb-6">
          <ProjectFilterBar
            tags={allTags}
            onFilter={setSelectedTags}
            onSearch={setSearch}
            onSort={(sortBy, sortOrder) => {
              setSortBy(sortBy);
              setSortOrder(sortOrder);
            }}
            activeTag={selectedTags[0] || null}
          />
        </div>

        {/* Results Summary */}
        {!loading && (
          <motion.div
            className="mb-6 text-center text-sm text-gray-600 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Showing {filteredAndSortedProjects.length} of {projects.length} projects
            {(selectedTags.length > 0 || search) && (
              <span className="ml-2">
                (filtered by {selectedTags.length > 0 ? `${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''}` : ''}
                {selectedTags.length > 0 && search ? ' and ' : ''}
                {search ? 'search' : ''})
              </span>
            )}
          </motion.div>
        )}

        <motion.div
          className="w-full max-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          ) : projects.length === 0 ? (
            <div className="col-span-full text-center text-red-500 dark:text-red-400 py-8 font-bold text-lg">
              No projects loaded. Please check your data source.
            </div>
          ) : filteredAndSortedProjects.length === 0 ? (
            <motion.div 
              className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="mb-4">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <p className="text-xl font-semibold mb-2">No projects found</p>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            </motion.div>
          ) : (
            filteredAndSortedProjects.map((project: Project, i: number) => (
              <motion.div key={i} variants={item} className="h-full" data-testid="project-card">
                <ProjectCard {...project} />
              </motion.div>
            ))
          )}
        </motion.div>
        {/* Floating Contact Button - removed, now handled globally */}
      </motion.section>
    </>
  );
}
