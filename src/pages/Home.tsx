import Hero from './Hero';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blog';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Contact from './Contact';

const aboutSummary = `🎓 I'm an AI-driven Computer Science student at BUBT, deeply passionate about building intelligent systems. My main interests lie in Deep Learning, NLP, and LLMs — with hands-on experience using PyTorch, TensorFlow, and Hugging Face.\n\n🔬 Currently exploring prompt engineering, multimodal AI, and LangChain-based applications.`;

export default function Home() {
  return (
    <div>
      <Hero />
      {/* About Preview */}
      <motion.section id="about-preview" className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        <h2 className="text-2xl font-bold mb-2 dark:text-white">🧑‍💻 About Me</h2>
        <p className="text-gray-700 dark:text-gray-200 mb-4 whitespace-pre-line">{aboutSummary}</p>
        <Link to="/about" className="btn">👉 Read More</Link>
      </motion.section>

      {/* Projects Preview */}
      <motion.section id="projects-preview" className="max-w-5xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        <h2 className="text-2xl font-bold mb-6 dark:text-white">📁 Featured Projects</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
        <Link to="/projects" className="btn mt-6">👉 See All Projects</Link>
      </motion.section>

      {/* Blog Preview */}
      <motion.section id="blog-preview" className="max-w-5xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        <h2 className="text-2xl font-bold mb-6 dark:text-white">✍️ Recent Blog Posts</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="border rounded-lg p-4 bg-white dark:bg-gray-800 shadow transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group block"
            >
              <h3 className="text-lg font-semibold text-primary mb-1 dark:text-primary">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">{post.date}</p>
              <p className="text-gray-700 dark:text-gray-200 mb-2">{post.summary.length > 110 ? post.summary.slice(0, 110) + '…' : post.summary}</p>
            </Link>
          ))}
        </div>
        <Link to="/blog" className="btn mt-6">👉 Read All Blogs</Link>
      </motion.section>

      {/* Contact Section (Full) */}
      <motion.div id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        <Contact />
      </motion.div>
    </div>
  );
}
