import React from 'react';
import { projects, Project } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import ProjectCardSkeleton from '../components/ProjectCardSkeleton';
import ProjectFilterBar from '../components/ProjectFilterBar';
import { motion, useInView } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function Projects() {
  const navigate = useNavigate();
  const location = useLocation();
  // Read filter from query param on mount
  const params = new URLSearchParams(location.search);
  const initialFilter = params.get('filter');
  const [filter, setFilter] = React.useState<string | null>(initialFilter);
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = React.useState(true);

  // Update URL when filter changes
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (filter) {
      params.set('filter', filter);
    } else {
      params.delete('filter');
    }
    navigate({ search: params.toString() }, { replace: true });
  }, [filter]);

  React.useEffect(() => {
    // Simulate loading delay for skeleton demo (replace with real loading logic if needed)
    const timeout = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timeout);
  }, []);

  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags || [])));
  const filteredProjects = projects.filter((project) => {
    const matchesTag = filter ? (project.tags || []).includes(filter) : true;
    const matchesSearch = search
      ? (project.title + project.description).toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        const el = document.getElementById('contact');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <meta property="og:url" content="https://aminul01-g.github.io/projects" />
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <ProjectFilterBar
            tags={allTags}
            onFilter={setFilter}
            onSearch={setSearch}
            activeTag={filter}
          />
        </div>
        <div className="w-full max-w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <ProjectCardSkeleton key={i} />)
          ) : projects.length === 0 ? (
            <div className="col-span-full text-center text-red-500 dark:text-red-400 py-8 font-bold text-lg">
              No projects loaded. Please check your data source.
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8 text-lg">
              No projects found.
            </div>
          ) : (
            filteredProjects.map((project: Project, i: number) => (
              <motion.div
                key={i}
                className="h-full"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12, delay: i * 0.06 }}
              >
                <ProjectCard {...project} />
              </motion.div>
            ))
          )}
        </div>
        <a
          href="/#contact"
          className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-primary text-white rounded-full shadow-lg p-4 flex items-center gap-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          aria-label="Contact"
          tabIndex={0}
          onClick={handleContactClick}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 10.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l2.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6A8.38 8.38 0 0112 3.5a8.5 8.5 0 018.5 8.5z"
            />
          </svg>
        </a>
      </motion.section>
    </>
  );
}
