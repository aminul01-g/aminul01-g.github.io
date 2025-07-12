import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPost {
  _id: string;
  slug: string;
  title: string;
  summary: string;
  date: string;
  tags?: string[];
}

interface BlogSearchProps {
  posts: BlogPost[];
  onSearchChange: (filteredPosts: BlogPost[]) => void;
  className?: string;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ posts, onSearchChange, className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Get all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [posts]);

  // Filter posts based on search term and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = searchTerm === '' || 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => post.tags?.includes(tag));
      
      return matchesSearch && matchesTags;
    });
  }, [posts, searchTerm, selectedTags]);

  // Update parent component when filtered posts change
  React.useEffect(() => {
    onSearchChange(filteredPosts);
  }, [filteredPosts, onSearchChange]);

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTags([]);
  };

  return (
    <motion.div 
      className={`glass-card p-6 rounded-2xl backdrop-blur-xl ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Input */}
      <div className="relative mb-6">
        <motion.div
          className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.div>
        
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
        />
        
        {searchTerm && (
          <motion.button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Tags Filter */}
      {allTags.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-medium mb-3">Filter by tags:</h3>
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag, index) => (
              <motion.button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 border ${
                  selectedTags.includes(tag)
                    ? 'bg-primary/20 border-primary/40 text-primary-300'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/40'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                #{tag}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-gray-300">
        <span>
          {filteredPosts.length} of {posts.length} posts
        </span>
        
        {(searchTerm || selectedTags.length > 0) && (
          <motion.button
            onClick={clearFilters}
            className="text-primary-300 hover:text-primary-200 transition-colors duration-200 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear filters
          </motion.button>
        )}
      </div>

      {/* Active Filters Display */}
      <AnimatePresence>
        {(searchTerm || selectedTags.length > 0) && (
          <motion.div
            className="mt-4 p-3 bg-white/5 rounded-lg border border-white/10"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-wrap gap-2">
              {searchTerm && (
                <span className="px-2 py-1 bg-primary/20 text-primary-300 rounded-full text-xs">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedTags.map(tag => (
                <span key={tag} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs">
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BlogSearch; 