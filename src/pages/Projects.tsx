import { projects, Project } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Projects() {
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <motion.section
      id="projects"
      className="relative max-w-5xl mx-auto p-8 bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-primary/10 dark:border-gray-700 backdrop-blur-xl animate-fadeInUp transition-all duration-300 mb-16 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        aria-hidden
      >
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-purple-400/30 to-blue-400/10 rounded-full blur-2xl animate-pulse" />
      </motion.div>
      <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300 relative z-10">Projects</h2>
      <p className="text-center text-gray-500 dark:text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">A showcase of my favorite projects, spanning AI, data science, and full-stack development. Each project reflects my passion for building intelligent, impactful solutions.</p>
      <div className="grid gap-8 sm:grid-cols-2 relative z-10">
        {projects.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">No projects yet. Stay tuned!</div>
        ) : (
          projects.map((project: Project, i: number) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl bg-white/70 dark:bg-gray-900/70 border border-primary/10 dark:border-gray-700 shadow-lg p-6 flex flex-col items-start transition-all duration-300 hover:shadow-xl hover:scale-[1.03] backdrop-blur-md"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.12, delay: i * 0.06 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))
        )}
      </div>
      {/* Floating Contact Button - matches Home page position and style, links to Home's contact section */}
      <a
        href="/#contact"
        className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 bg-primary text-white rounded-full shadow-lg p-4 flex items-center gap-2 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-primary transition-all animate-bounce"
        aria-label="Contact"
        tabIndex={0}
        onClick={handleContactClick}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 10.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l2.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6A8.38 8.38 0 0112 3.5a8.5 8.5 0 018.5 8.5z" /></svg>
        <span className="hidden sm:inline">Contact</span>
      </a>
    </motion.section>
  );
}