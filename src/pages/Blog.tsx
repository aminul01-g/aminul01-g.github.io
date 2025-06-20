import { blogPosts, BlogPost } from '../data/blog';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Blog() {
  return (
    <motion.section
      id="blog"
      className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 transition-colors duration-300 mb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold text-center mb-6 dark:text-white">Blog</h2>
      <div className="space-y-6">
        {blogPosts.map((post: BlogPost) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block border rounded-lg p-4 hover:shadow-md bg-white dark:bg-gray-800 transition-colors duration-300"
          >
            <h3 className="text-xl font-semibold text-primary mb-1 dark:text-primary">{post.title}</h3>
            <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">{post.date}</p>
            <p className="text-gray-700 dark:text-gray-200">{post.summary}</p>
          </Link>
        ))}
      </div>
    </motion.section>
  );
}