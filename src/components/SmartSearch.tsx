import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiX, FiClock } from 'react-icons/fi';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blog';

type SearchCategory = 'all' | 'projects' | 'blog' | 'skills';

interface SearchableItem {
  title: string;
  description: string;
  slug?: string;
  name?: string;
  summary?: string;
  tags?: string[];
  thumbnail?: string;
  technologies?: string[];
}

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'blog' | 'skill';
  url: string;
  relevance: number;
  thumbnail?: string;
}

interface SmartSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const skillsData = [
  { name: 'TensorFlow', category: 'AI/ML', description: 'Deep learning framework' },
  { name: 'PyTorch', category: 'AI/ML', description: 'Machine learning library' },
  { name: 'React', category: 'Frontend', description: 'UI library' },
  { name: 'TypeScript', category: 'Frontend', description: 'Typed superset of JavaScript' },
  { name: 'Node.js', category: 'Backend', description: 'JavaScript runtime' },
  { name: 'Git', category: 'Tools', description: 'Version control system' },
];

interface BlogPost {
  title: string;
  summary: string;
  tags?: string[];
  slug: string;
  thumbnail?: string;
}

const fuzzyMatch = (pattern: string, text: string): number => {
  const patternLower = pattern.toLowerCase();
  const textLower = text.toLowerCase();

  if (textLower.includes(patternLower)) {
    return 1.0; // Exact substring match
  }

  let score = 0;
  let patternIndex = 0;

  for (let i = 0; i < textLower.length && patternIndex < patternLower.length; i++) {
    if (textLower[i] === patternLower[patternIndex]) {
      score += 1;
      patternIndex++;
    }
  }

  return patternIndex === patternLower.length ? score / pattern.length : 0;
};

const semanticSimilarity = (query: string, text: string): number => {
  const queryWords = query.toLowerCase().split(' ');
  const textWords = text.toLowerCase().split(' ');

  let matches = 0;
  queryWords.forEach((qWord) => {
    textWords.forEach((tWord) => {
      if (qWord === tWord || qWord.includes(tWord) || tWord.includes(qWord)) {
        matches++;
      }
    });
  });

  return matches / Math.max(queryWords.length, textWords.length);
};

const calculateRelevance = (query: string, item: SearchableItem): number => {
  const title = item.title || item.name || '';
  const description = item.description || item.summary || '';
  const tags = item.tags || item.technologies || [];

  const titleScore = fuzzyMatch(query, title) * 3;
  const descScore = fuzzyMatch(query, description) * 2;
  const tagsScore = tags.reduce((acc: number, tag: string) => acc + fuzzyMatch(query, tag), 0);
  const semanticScore = semanticSimilarity(query, `${title} ${description} ${tags.join(' ')}`);

  return titleScore + descScore + tagsScore + semanticScore;
};

const search = (query: string, category: SearchCategory = 'all'): SearchResult[] => {
  if (!query.trim()) return [];

  const results: SearchResult[] = [];
  const searchQuery = query.toLowerCase();

  // Search projects
  if (category === 'all' || category === 'projects') {
    projects.forEach((project) => {
      const score = calculateRelevance(searchQuery, project);
      if (score > 0) {
        results.push({
          id: project.slug,
          title: project.title,
          description: project.description,
          type: 'project',
          url: `/projects/${project.slug}`,
          relevance: score,
          thumbnail: project.thumbnail,
        });
      }
    });
  }

  // Search blog posts
  if (category === 'all' || category === 'blog') {
    blogPosts.forEach((post: BlogPost) => {
      const score = calculateRelevance(searchQuery, {
        title: post.title,
        description: post.summary,
        tags: post.tags,
        slug: post.slug,
        thumbnail: post.thumbnail,
      });

      if (score > 0) {
        results.push({
          id: post.slug,
          title: post.title,
          description: post.summary,
          type: 'blog',
          url: `/blog/${post.slug}`,
          relevance: score,
          thumbnail: post.thumbnail,
        });
      }
    });
  }

  // Search skills
  if (category === 'all' || category === 'skills') {
    skillsData.forEach((skill) => {
      const score = calculateRelevance(searchQuery, {
        title: skill.name,
        name: skill.name,
        description: skill.description,
        tags: [skill.category],
      });

      if (score > 0) {
        results.push({
          id: skill.name,
          title: skill.name,
          description: `${skill.category}: ${skill.description}`,
          type: 'skill',
          url: `/#skills`,
          relevance: score,
        });
      }
    });
  }

  return results.sort((a: SearchResult, b: SearchResult) => b.relevance - a.relevance);
};

export const SmartSearch: React.FC<SmartSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<SearchCategory>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const popularSearches = ['AI', 'Machine Learning', 'React', 'Python', 'TypeScript', 'Portfolio'];

  useEffect(() => {
    const saved = localStorage.getItem('recentSearches');
    if (saved) {
      setRecentSearches(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  const generateSuggestions = useMemo(() => {
    if (!query || query.length < 2) return [];

    const allTerms = [
      ...projects.flatMap((p) => [p.title, ...p.technologies]),
      ...blogPosts.map((b) => b.title),
      ...skillsData.map((s) => s.name),
      ...popularSearches,
    ];

    return allTerms
      .filter((term: string) => term.toLowerCase().includes(query.toLowerCase()) && term !== query)
      .slice(0, 5);
  }, [query]);

  useEffect(() => {
    setResults(search(query, selectedFilter));
  }, [query, selectedFilter]);

  useEffect(() => {
    setSuggestions(generateSuggestions);
  }, [generateSuggestions]);

  const handleSearch = (searchTerm: string) => {
    setQuery(searchTerm);

    // Save to recent searches
    const updated = [searchTerm, ...recentSearches.filter((s) => s !== searchTerm)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('recentSearches', JSON.stringify(updated));
  };

  const getTypeIcon = (type: 'project' | 'blog' | 'skill'): string => {
    switch (type) {
      case 'project':
        return '🚀';
      case 'blog':
        return '📝';
      case 'skill':
        return '⚡';
      default:
        return '🔍';
    }
  };

  const getTypeColor = (type: 'project' | 'blog' | 'skill'): string => {
    switch (type) {
      case 'project':
        return 'text-blue-500';
      case 'blog':
        return 'text-green-500';
      case 'skill':
        return 'text-purple-500';
      default:
        return 'text-gray-500';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20"
        onClick={onClose}
      >
        <motion.div
          ref={searchContainerRef}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="w-full max-w-2xl mx-4 glass-card rounded-2xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search projects, blog posts, skills..."
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value as SearchCategory)}
                  className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="all">All</option>
                  <option value="projects">Projects</option>
                  <option value="blog">Blog</option>
                  <option value="skills">Skills</option>
                </select>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Content */}
          <div className="max-h-96 overflow-y-auto">
            {!query ? (
              <div className="p-6 space-y-6">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Recent Searches</h3>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(search)}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center gap-2">
                    <FiClock className="w-4 h-4" />
                    Popular Searches
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-1 bg-primary/20 hover:bg-primary/30 rounded-full text-sm text-primary transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {/* Suggestions */}
                {suggestions.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Suggestions</h3>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSearch(suggestion)}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-sm text-white transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Results */}
                {results.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-400">
                      {results.length} result{results.length !== 1 ? 's' : ''} found
                    </h3>
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="block p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">{getTypeIcon(result.type)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-white group-hover:text-primary transition-colors">
                                {result.title}
                              </h4>
                              <span
                                className={`text-xs px-2 py-1 rounded-full bg-white/10 ${getTypeColor(result.type)}`}
                              >
                                {result.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                              {result.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No Results */}
                {query && results.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-medium text-white mb-2">No results found</h3>
                    <p className="text-gray-400">
                      Try adjusting your search terms or browse popular searches above.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
