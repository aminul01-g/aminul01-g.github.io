import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiTrendingUp, FiEye, FiHeart, FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blog';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'blog' | 'skill';
  url: string;
  tags: string[];
  relevanceScore: number;
  reason: string;
  thumbnail?: string;
}

interface RecommendationItem {
  id: string;
  title: string;
  description: string;
  type: 'project' | 'blog' | 'skill';
  url: string;
  relevanceScore: number;
  reason: string;
  thumbnail?: string;
  tags: string[];
}

interface UserInteraction {
  itemId: string;
  itemType: 'project' | 'blog' | 'skill';
  action: 'view' | 'like' | 'share' | 'click';
  timestamp: Date;
  tags: string[];
}

interface ContentRecommendationsProps {
  currentItemId?: string;
  currentItemType?: 'project' | 'blog' | 'skill';
  currentTags?: string[];
  maxRecommendations?: number;
  className?: string;
}

// Skills data for recommendations
const skillsData = [
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'AI/ML',
    description: 'Deep learning framework for building neural networks',
    tags: ['AI', 'ML', 'Deep Learning', 'Python'],
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI/ML',
    description: 'Machine learning library for research and production',
    tags: ['AI', 'ML', 'Deep Learning', 'Python'],
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    description: 'JavaScript library for building user interfaces',
    tags: ['Frontend', 'JavaScript', 'Web Development'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Programming',
    description: 'Typed superset of JavaScript',
    tags: ['Programming', 'JavaScript', 'Web Development'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Programming',
    description: 'Versatile programming language for AI and web development',
    tags: ['Programming', 'AI', 'Data Science'],
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'DevOps',
    description: 'Containerization platform for application deployment',
    tags: ['DevOps', 'Cloud', 'Deployment'],
  },
  {
    id: 'aws',
    name: 'AWS',
    category: 'Cloud',
    description: 'Amazon Web Services cloud platform',
    tags: ['Cloud', 'DevOps', 'Infrastructure'],
  },
  {
    id: 'git',
    name: 'Git',
    category: 'Tools',
    description: 'Version control system for code management',
    tags: ['Tools', 'Development', 'Collaboration'],
  },
];

// Calculate content similarity based on tags
const calculateSimilarity = (tags1: string[], tags2: string[]): number => {
  const set1 = new Set(tags1.map((tag) => tag.toLowerCase()));
  const set2 = new Set(tags2.map((tag) => tag.toLowerCase()));

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  return intersection.size / union.size; // Jaccard similarity
};

// Generate recommendation reasons
const getRecommendationReason = (similarity: number, commonTags: string[]): string => {
  if (similarity > 0.7) {
    return `Highly related to your interests in ${commonTags.slice(0, 2).join(' and ')}`;
  } else if (similarity > 0.4) {
    return `Related to ${commonTags[0]} and similar technologies`;
  } else if (similarity > 0.2) {
    return `Might interest you based on ${commonTags[0]}`;
  } else {
    return 'Trending content you might like';
  }
};

// AI-powered recommendation engine
const generateRecommendations = (
  currentItemId?: string,
  currentItemType?: string,
  currentTags: string[] = [],
  userInteractions: UserInteraction[] = [],
  maxRecommendations: number = 6
): ContentItem[] => {
  const recommendations: ContentItem[] = [];

  // Get user's preferred tags from interactions
  const userTagPreferences: Record<string, number> = userInteractions.reduce<
    Record<string, number>
  >((acc, interaction) => {
    interaction.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});

  const preferredTags = Object.entries(userTagPreferences)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([tag]) => tag);

  const allRelevantTags = [...currentTags, ...preferredTags];

  // Recommend projects
  projects.forEach((project) => {
    if (project.slug === currentItemId) return;

    const similarity = calculateSimilarity(allRelevantTags, project.technologies);
    const commonTags = allRelevantTags.filter((tag) =>
      project.technologies.some((tech) => tech.toLowerCase().includes(tag.toLowerCase()))
    );

    if (similarity > 0.1 || commonTags.length > 0) {
      recommendations.push({
        id: project.slug || project.title.toLowerCase().replace(/\s+/g, '-'),
        title: project.title,
        description: project.description,
        type: 'project',
        url: `/projects/${project.slug || project.title.toLowerCase().replace(/\s+/g, '-')}`,
        tags: project.technologies || [],
        relevanceScore: similarity,
        reason: getRecommendationReason(similarity, commonTags),
        thumbnail: project.thumbnail,
      });
    }
  });

  // Recommend blog posts
  blogPosts.forEach((post) => {
    if (post.slug === currentItemId) return;

    const postTags = post.tags || [];
    const similarity = calculateSimilarity(allRelevantTags, postTags);
    const commonTags = allRelevantTags.filter((tag) =>
      postTags.some((postTag) => postTag.toLowerCase().includes(tag.toLowerCase()))
    );

    if (similarity > 0.1 || commonTags.length > 0) {
      recommendations.push({
        id: post.slug,
        title: post.title,
        description: post.summary,
        type: 'blog',
        url: `/blog/${post.slug}`,
        tags: postTags,
        relevanceScore: similarity,
        reason: getRecommendationReason(similarity, commonTags),
      });
    }
  });

  // Recommend skills
  skillsData.forEach((skill) => {
    if (skill.id === currentItemId) return;

    const similarity = calculateSimilarity(allRelevantTags, skill.tags);
    const commonTags = allRelevantTags.filter((tag) =>
      skill.tags.some((skillTag) => skillTag.toLowerCase().includes(tag.toLowerCase()))
    );

    if (similarity > 0.1 || commonTags.length > 0) {
      recommendations.push({
        id: skill.id,
        title: skill.name,
        description: skill.description,
        type: 'skill',
        url: '/#skills',
        tags: skill.tags,
        relevanceScore: similarity,
        reason: getRecommendationReason(similarity, commonTags),
      });
    }
  });

  // Sort by relevance and return top recommendations
  return recommendations
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxRecommendations);
};

export const ContentRecommendations: React.FC<ContentRecommendationsProps> = ({
  currentItemId,
  currentItemType,
  currentTags = [],
  maxRecommendations = 6,
  className = '',
}) => {
  const [userInteractions, setUserInteractions] = useState<UserInteraction[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [viewedItems, setViewedItems] = useState<Set<string>>(new Set());

  // Load user interactions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('userInteractions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserInteractions(
          parsed.map((item: UserInteraction) => ({
            ...item,
            timestamp: new Date(item.timestamp),
          }))
        );
      } catch (error) {
        console.error('Error loading user interactions:', error);
      }
    }
  }, []);

  // Save user interactions to localStorage
  useEffect(() => {
    if (userInteractions.length > 0) {
      localStorage.setItem('userInteractions', JSON.stringify(userInteractions));
    }
  }, [userInteractions]);

  // Track current item view
  useEffect(() => {
    if (currentItemId && currentItemType) {
      const interaction: UserInteraction = {
        itemId: currentItemId,
        itemType: currentItemType,
        action: 'view',
        timestamp: new Date(),
        tags: currentTags,
      };

      setUserInteractions((prev) => [...prev.slice(-49), interaction]); // Keep last 50 interactions
      setViewedItems((prev) => new Set([...prev, currentItemId]));
    }
  }, [currentItemId, currentItemType, currentTags]);

  // Generate recommendations
  const recommendations = useMemo(() => {
    return generateRecommendations(
      currentItemId,
      currentItemType,
      currentTags,
      userInteractions,
      maxRecommendations
    );
  }, [currentItemId, currentItemType, currentTags, userInteractions, maxRecommendations]);

  const handleItemClick = (item: ContentItem) => {
    const interaction: UserInteraction = {
      itemId: item.id,
      itemType: item.type,
      action: 'click',
      timestamp: new Date(),
      tags: item.tags,
    };

    setUserInteractions((prev) => [...prev.slice(-49), interaction]);
  };

  const handleLike = (item: ContentItem, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const interaction: UserInteraction = {
      itemId: item.id,
      itemType: item.type,
      action: 'like',
      timestamp: new Date(),
      tags: item.tags,
    };

    setUserInteractions((prev) => [...prev.slice(-49), interaction]);
  };

  const refreshRecommendations = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const getTypeIcon = (type: string): string => {
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

  const getTypeColor = (type: string): string => {
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

  if (recommendations.length === 0) {
    return null;
  }

  const sortedRecommendations = [...recommendations].sort(
    (a: RecommendationItem, b: RecommendationItem) => b.relevanceScore - a.relevanceScore
  );

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiStar className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recommended for You
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Based on your interests and browsing history
            </p>
          </div>
        </div>

        <button
          onClick={refreshRecommendations}
          disabled={isRefreshing}
          className="p-2 text-gray-500 hover:text-primary transition-colors disabled:opacity-50"
          title="Refresh recommendations"
        >
          <FiRefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Recommendations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {sortedRecommendations.map((item: RecommendationItem) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: sortedRecommendations.indexOf(item) * 0.1 }}
              className="group"
            >
              <Link to={item.url} onClick={() => handleItemClick(item)} className="block h-full">
                <div className="glass-card rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:scale-[1.02] border border-primary/10 dark:border-gray-700">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{getTypeIcon(item.type)}</span>
                      <div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full bg-white/10 ${getTypeColor(item.type)}`}
                        >
                          {item.type}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {viewedItems.has(item.id) && (
                        <FiEye className="w-4 h-4 text-gray-400" title="Already viewed" />
                      )}
                      <button
                        onClick={(e) => handleLike(item, e)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        title="Like this recommendation"
                      >
                        <FiHeart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                      {item.description}
                    </p>

                    {/* Reason */}
                    <div className="flex items-center gap-2 text-xs text-primary">
                      <FiTrendingUp className="w-3 h-3" />
                      <span>{item.reason}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {item.tags &&
                        item.tags.map((tag: string, tagIndex: number) => (
                          <span
                            key={tagIndex}
                            className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      {item.tags && item.tags.length > 3 && (
                        <span className="text-xs text-gray-400">+{item.tags.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <span>Relevance: {Math.round(item.relevanceScore * 100)}%</span>
                    </div>

                    <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                      <span>Explore</span>
                      <FiArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* User Insights */}
      {userInteractions.length > 0 && (
        <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            Your Activity Insights
          </h3>
          <div className="flex flex-wrap gap-2 text-xs">
            {Object.entries(
              userInteractions.reduce<Record<string, number>>((acc, interaction) => {
                interaction.tags.forEach((tag) => {
                  acc[tag] = (acc[tag] || 0) + 1;
                });
                return acc;
              }, {})
            )
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([tag, count]: [string, number]) => (
                <span key={tag} className="px-2 py-1 bg-primary/20 text-primary rounded-full">
                  {tag} ({count})
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};
