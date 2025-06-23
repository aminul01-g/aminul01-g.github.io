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
      <motion.section id="about-preview" className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16 fade-in max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300 mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
          About Me
        </h2>
        <p className="text-gray-700 dark:text-gray-200 mb-4 whitespace-pre-line">{aboutSummary}</p>
        <Link to="/about" className="btn">Read More</Link>
      </motion.section>

      {/* Skills & Expertise Section */}
      <motion.section
        id="skills"
        className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16 fade-in max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300 mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
          Skills & Expertise
        </h2>
        <p className="mb-10 text-gray-500 dark:text-gray-300 text-base sm:text-lg">Leveraging cutting-edge technologies to build innovative solutions</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl">
          {/* AI/ML */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:from-gray-900/80 dark:to-gray-800/80 shadow-xl p-8 text-left border border-gray-200 dark:border-gray-800 relative overflow-hidden group transition-colors duration-300 hover:shadow-2xl hover:-translate-y-1"
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white text-2xl shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1V8h-1m-4 0h1v4h1m-4 0h1v4h1" /></svg>
              </span>
              <span className="font-bold text-lg text-gray-900 dark:text-white">AI/ML</span>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>TensorFlow</li>
              <li>PyTorch</li>
              <li>Scikit-learn</li>
              <li>LLMs</li>
              <li>Computer Vision</li>
            </ul>
          </motion.div>
          {/* Programming */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:from-gray-900/80 dark:to-gray-800/80 shadow-xl p-8 text-left border border-gray-200 dark:border-gray-800 relative overflow-hidden group transition-colors duration-300 hover:shadow-2xl hover:-translate-y-1"
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white text-2xl shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
              </span>
              <span className="font-bold text-lg text-gray-900 dark:text-white">Programming</span>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>Python</li>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>C++</li>
              <li>Java</li>
            </ul>
          </motion.div>
          {/* Data Science */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:from-gray-900/80 dark:to-gray-800/80 shadow-xl p-8 text-left border border-gray-200 dark:border-gray-800 relative overflow-hidden group transition-colors duration-300 hover:shadow-2xl hover:-translate-y-1"
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white text-2xl shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 008.6 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004 8.6a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33h.09A1.65 1.65 0 008.6 4a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09c0 .66.42 1.24 1 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.09c0 .66.42 1.24 1 1.51h.09a1.65 1.65 0 001.51 1V12a2 2 0 010 4h-.09c-.66 0-1.24.42-1.51 1z" /></svg>
              </span>
              <span className="font-bold text-lg text-gray-900 dark:text-white">Data Science</span>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>Pandas</li>
              <li>NumPy</li>
              <li>Data Analysis</li>
              <li>Data Visualization</li>
            </ul>
          </motion.div>
          {/* Tools & Platforms */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:from-gray-900/80 dark:to-gray-800/80 shadow-xl p-8 text-left border border-gray-200 dark:border-gray-800 relative overflow-hidden group transition-colors duration-300 hover:shadow-2xl hover:-translate-y-1"
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white text-2xl shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3m-4 4v4a1 1 0 001 1h3m10-5v4a1 1 0 01-1 1h-3" /></svg>
              </span>
              <span className="font-bold text-lg text-gray-900 dark:text-white">Tools & Platforms</span>
            </div>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300 text-base">
              <li>Docker</li>
              <li>Git</li>
              <li>AWS</li>
              <li>Linux</li>
              <li>MLOps</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        id="tech-stack"
        className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16 fade-in max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300 mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
          Tech Stack
        </h2>
        <p className="mb-10 text-gray-500 dark:text-gray-300 text-base sm:text-lg">Cutting-edge technologies I work with</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-5xl">
          {/* AI/ML */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:from-gray-900/80 dark:to-gray-800/80 shadow-xl p-8 text-left border border-gray-200 dark:border-gray-800 relative overflow-hidden group transition-colors duration-300 hover:shadow-2xl hover:-translate-y-1"
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white text-2xl shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm0-14a6 6 0 100 12 6 6 0 000-12z" /></svg>
              </span>
              <span className="font-bold text-lg text-gray-900 dark:text-white">AI/ML</span>
            </div>
            <ul className="space-y-2 text-blue-400 text-base">
              <li>Python</li>
              <li>TensorFlow</li>
              <li>PyTorch</li>
              <li>Scikit-learn</li>
            </ul>
          </motion.div>
          {/* Frameworks */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:from-gray-900/80 dark:to-gray-800/80 shadow-xl p-8 text-left border border-gray-200 dark:border-gray-800 relative overflow-hidden group transition-colors duration-300 hover:shadow-2xl hover:-translate-y-1"
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white text-2xl shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2" /></svg>
              </span>
              <span className="font-bold text-lg text-gray-900 dark:text-white">Frameworks</span>
            </div>
            <ul className="space-y-2 text-blue-400 text-base">
              <li>Django</li>
              <li>FastAPI</li>
              <li>LangChain</li>
              <li>Crew-AI</li>
            </ul>
          </motion.div>
          {/* NLP */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:from-gray-900/80 dark:to-gray-800/80 shadow-xl p-8 text-left border border-gray-200 dark:border-gray-800 relative overflow-hidden group transition-colors duration-300 hover:shadow-2xl hover:-translate-y-1"
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white text-2xl shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 9h6v6H9z" /></svg>
              </span>
              <span className="font-bold text-lg text-gray-900 dark:text-white">NLP</span>
            </div>
            <ul className="space-y-2 text-blue-400 text-base">
              <li>LLMs</li>
              <li>Llama-Index</li>
              <li>BERT</li>
              <li>Transformers</li>
            </ul>
          </motion.div>
          {/* Databases */}
          <motion.div
            className="rounded-2xl bg-gradient-to-br from-white to-gray-200 dark:from-gray-900/80 dark:to-gray-800/80 shadow-xl p-8 text-left border border-gray-200 dark:border-gray-800 relative overflow-hidden group transition-colors duration-300 hover:shadow-2xl hover:-translate-y-1"
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white text-2xl shadow-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><ellipse cx="12" cy="7" rx="8" ry="3" /><path d="M4 7v10c0 1.657 3.582 3 8 3s8-1.343 8-3V7" /></svg>
              </span>
              <span className="font-bold text-lg text-gray-900 dark:text-white">Databases</span>
            </div>
            <ul className="space-y-2 text-blue-400 text-base">
              <li>MySQL</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
              <li>Redis</li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Projects Preview */}
      <motion.section id="projects-preview" className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16 fade-in max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300 mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
          Featured Projects
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
        <Link to="/projects" className="btn mt-6">See All Projects</Link>
      </motion.section>

      {/* Blog Preview */}
      <motion.section id="blog-preview" className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16 fade-in max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg transition-all duration-300 mb-12" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
          Recent Blog Posts
        </h2>
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
        <Link to="/blog" className="btn mt-6">Read All Blogs</Link>
      </motion.section>

      {/* Contact Section (Full) */}
      <motion.div id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }}>
        <Contact />
      </motion.div>
    </div>
  );
}