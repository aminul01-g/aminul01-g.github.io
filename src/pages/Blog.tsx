import React from 'react';
import { blogPosts, BlogPost } from '../data/blog';
import BlogCardTiltWrapper from '../components/BlogCardTiltWrapper';
import BlogFilterBar from '../components/BlogFilterBar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function Blog(): React.ReactElement {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState('');

  const allTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags || [])));
  const filteredPosts = blogPosts.filter((post) => {
    const matchesTag = filter ? (post.tags || []).includes(filter) : true;
    const matchesSearch = search
      ? (post.title + post.summary).toLowerCase().includes(search.toLowerCase())
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
  return (
    <>
      <Helmet>
        <title>Blog | Aminul Islam Bhuiyan Amin</title>
        <meta
          name="description"
          content="Read articles and insights on AI, ML, and software by Aminul Islam Bhuiyan Amin."
        />
        <meta property="og:title" content="Blog | Aminul Islam Bhuiyan Amin" />
        <meta
          property="og:description"
          content="Read articles and insights on AI, ML, and software by Aminul Islam Bhuiyan Amin."
        />
        <meta property="og:image" content="https://aminul01-g.github.io/logo512.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aminul01-g.github.io/blog" />
      </Helmet>
      <motion.section
        id="blog"
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
          <div className="absolute -top-32 -left-32 w-96 h-96 themed-gradient-1 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-80 h-80 themed-gradient-2 rounded-full blur-2xl animate-pulse" />
        </motion.div>
        <h2 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300 relative z-10">
          Blog
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-8 max-w-2xl mx-auto relative z-10">
          Insights, tutorials, and stories from my journey in tech, AI, and creative coding. Explore
          my thoughts, discoveries, and lessons learned along the way.
        </p>
        <BlogFilterBar
          tags={allTags}
          onFilter={setFilter}
          onSearch={setSearch}
          activeTag={filter}
        />
        <div className="grid gap-8 md:grid-cols-2 relative z-10">
          {filteredPosts.length === 0 ? (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
              No blog posts found.
            </div>
          ) : (
            filteredPosts.map((post: BlogPost, i: number) => (
              <BlogCardTiltWrapper key={post.slug}>
                <motion.div
                  className="glass-card rounded-2xl bg-white/70 dark:bg-gray-900/70 border border-primary/10 dark:border-gray-700 shadow-lg p-6 flex flex-col items-start transition-all duration-300 hover:shadow-xl hover:scale-[1.03] backdrop-blur-md group focus-within:ring-2 focus-within:ring-primary"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.12, delay: i * 0.06 }}
                  tabIndex={0}
                  aria-label={`Blog post: ${post.title}`}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="block w-full focus:outline-none focus:ring-2 focus:ring-primary rounded-lg transition-all duration-200 group-hover:scale-[1.02]"
                    style={{ minHeight: 64 }}
                    aria-label={`Read blog post: ${post.title}`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <svg
                        className="w-6 h-6 text-primary/80 dark:text-primary/80 group-hover:scale-110 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h5l2-2h5a2 2 0 012 2v12a2 2 0 01-2 2z"
                        />
                      </svg>
                      <h3 className="text-xl font-semibold text-primary mb-0 dark:text-primary group-hover:underline">
                        {post.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-2 dark:text-gray-400">{post.date}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {(post.tags || []).map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary/10 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 text-xs px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-200">{post.summary}</p>
                  </Link>
                </motion.div>
              </BlogCardTiltWrapper>
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
          <span className="hidden sm:inline">Contact</span>
        </a>
      </motion.section>
    </>
  );
}
