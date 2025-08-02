import React from 'react';
import BlogCardTiltWrapper from '../components/BlogCardTiltWrapper';
import BlogFilterBar from '../components/BlogFilterBar';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { BlogPost, blogPosts } from '../data/blog';

export default function Blog(): React.ReactElement {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [filter, setFilter] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    // Use mock data instead of Sanity fetch
    setPosts(blogPosts);
  }, []);

  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags || [])));
  const filteredPosts = posts.filter((post) => {
    const matchesTag = filter ? (post.tags || []).includes(filter) : true;
    const matchesSearch = search
      ? (post.title + post.summary).toLowerCase().includes(search.toLowerCase())
      : true;
    return matchesTag && matchesSearch;
  });

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
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog | Aminul Islam Bhuiyan Amin" />
        <meta
          name="twitter:description"
          content="Read articles and insights on AI, ML, and software by Aminul Islam Bhuiyan Amin."
        />
        <meta name="twitter:image" content="https://aminul01-g.github.io/logo512.png" />
        <link rel="canonical" href="https://aminul01-g.github.io/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: "Aminul Islam Bhuiyan Amin's Blog",
            description:
              'Read articles and insights on AI, ML, and software by Aminul Islam Bhuiyan Amin.',
            url: 'https://aminul01-g.github.io/blog',
            author: {
              '@type': 'Person',
              name: 'Aminul Islam Bhuiyan Amin',
              url: 'https://aminul01-g.github.io',
            },
            publisher: {
              '@type': 'Person',
              name: 'Aminul Islam Bhuiyan Amin',
            },
            blogPost: filteredPosts.map((post) => ({
              '@type': 'BlogPosting',
              headline: post.title,
              description: post.summary,
              datePublished: post.date,
              author: {
                '@type': 'Person',
                name: 'Aminul Islam Bhuiyan Amin',
              },
              url: `https://aminul01-g.github.io/blog/${post.slug}`,
            })),
          })}
        </script>
        {/* BreadcrumbList structured data in a separate script tag */}
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
                name: 'Blog',
                item: 'https://aminul01-g.github.io/blog',
              },
            ],
          })}
        </script>
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
              <p className="text-lg mb-4">No blog posts available yet.</p>
              <p className="text-sm">
                New articles and insights will be published here soon. Stay tuned!
              </p>
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
                        aria-hidden="true"
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
        {/* Floating Contact Button - removed, now handled globally */}
      </motion.section>
    </>
  );
}