import { projects, Project } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { motion } from 'framer-motion';

export default function Projects() {
  return (
    <motion.section
      id="projects"
      className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 transition-colors duration-300 mb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project: Project, index: number) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </motion.section>
  );
}