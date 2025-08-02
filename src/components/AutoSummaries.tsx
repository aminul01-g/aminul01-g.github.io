import React, { useState, useEffect } from 'react';
import { FiCopy, FiCheck, FiZap, FiRefreshCw, FiSettings, FiBookOpen } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

interface SummaryOptions {
  type: 'brief' | 'detailed' | 'technical' | 'marketing';
  length: 'short' | 'medium' | 'long';
  tone: 'professional' | 'casual' | 'academic';
  includeKeywords: boolean;
}

interface GeneratedSummary {
  id: string;
  content: string;
  type: SummaryOptions['type'];
  length: SummaryOptions['length'];
  tone: SummaryOptions['tone'];
  keywords: string[];
  readingTime: number;
  confidence: number;
  timestamp: Date;
}

interface AutoSummariesProps {
  content: string;
  title: string;
  contentType: 'project' | 'blog';
  tags?: string[];
  className?: string;
  onSummaryGenerated?: (summary: GeneratedSummary) => void;
}

// AI-powered summary generation engine
const generateSummary = (
  content: string,
  title: string,
  contentType: 'project' | 'blog',
  options: SummaryOptions,
  tags: string[] = []
): GeneratedSummary => {
  // Extract key information from content
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const words = content.toLowerCase().split(/\s+/);
  const wordCount = words.length;
  
  // Calculate reading time (average 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200);
  
  // Extract keywords based on frequency and relevance
  const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them']);
  
  const wordFreq = words
    .filter(word => word.length > 3 && !stopWords.has(word))
    .reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  const keywords = [
    ...tags,
    ...Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word)
  ].slice(0, 8);
  
  // Generate summary based on type and length
  let summary = '';
  let targetLength = 0;
  
  switch (options.length) {
    case 'short':
      targetLength = 1;
      break;
    case 'medium':
      targetLength = 2;
      break;
    case 'long':
      targetLength = 3;
      break;
  }
  
  // Select most important sentences
  const importantSentences = sentences
    .map(sentence => {
      const sentenceWords = sentence.toLowerCase().split(/\s+/);
      const score = sentenceWords.reduce((acc, word) => {
        return acc + (wordFreq[word] || 0) + (keywords.includes(word) ? 2 : 0);
      }, 0);
      return { sentence: sentence.trim(), score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, Math.max(targetLength, 1))
    .map(item => item.sentence);
  
  // Generate summary based on type
  switch (options.type) {
    case 'brief':
      if (contentType === 'project') {
        summary = `${title} is a ${keywords.slice(0, 2).join(' and ')} project. ${importantSentences[0] || 'This project demonstrates modern development practices.'}`;
      } else {
        summary = `This blog post explores ${keywords.slice(0, 2).join(' and ')}. ${importantSentences[0] || 'It provides valuable insights for developers.'}`;
      }
      break;
      
    case 'detailed':
      summary = importantSentences.join(' ');
      if (options.includeKeywords) {
        summary += ` Key technologies include: ${keywords.slice(0, 5).join(', ')}.`;
      }
      break;
      
    case 'technical':
      const techKeywords = keywords.filter(k => 
        ['react', 'typescript', 'python', 'ai', 'ml', 'api', 'database', 'framework', 'library'].some(tech => 
          k.toLowerCase().includes(tech)
        )
      );
      summary = `Technical Overview: ${importantSentences.join(' ')}`;
      if (techKeywords.length > 0) {
        summary += ` Technologies: ${techKeywords.join(', ')}.`;
      }
      break;
      
    case 'marketing':
      if (contentType === 'project') {
        summary = `🚀 Discover ${title} - an innovative ${keywords[0]} solution that ${importantSentences[0]?.toLowerCase() || 'delivers exceptional results'}. Built with cutting-edge technology for optimal performance.`;
      } else {
        summary = `📝 Explore insights on ${keywords.slice(0, 2).join(' and ')} in this comprehensive guide. ${importantSentences[0] || 'Learn from real-world examples and best practices.'}`;
      }
      break;
  }
  
  // Adjust tone
  switch (options.tone) {
    case 'casual':
      summary = summary.replace(/\b(demonstrates|utilizes|implements)\b/gi, 'uses')
                    .replace(/\b(comprehensive|extensive)\b/gi, 'complete')
                    .replace(/\b(furthermore|moreover)\b/gi, 'also');
      break;
    case 'academic':
      summary = summary.replace(/\b(uses|shows)\b/gi, 'demonstrates')
                    .replace(/\b(complete|full)\b/gi, 'comprehensive')
                    .replace(/\b(also|too)\b/gi, 'furthermore');
      break;
    // Professional tone is default
  }
  
  // Calculate confidence based on content quality
  const confidence = Math.min(
    0.95,
    0.6 + 
    (sentences.length > 3 ? 0.1 : 0) +
    (keywords.length > 3 ? 0.1 : 0) +
    (wordCount > 100 ? 0.1 : 0) +
    (tags.length > 0 ? 0.05 : 0)
  );
  
  return {
    id: Date.now().toString(),
    content: summary,
    type: options.type,
    length: options.length,
    tone: options.tone,
    keywords,
    readingTime,
    confidence,
    timestamp: new Date()
  };
};

export const AutoSummaries: React.FC<AutoSummariesProps> = ({
  content,
  title,
  contentType,
  tags = [],
  className = '',
  onSummaryGenerated
}) => {
  const [summaries, setSummaries] = useState<GeneratedSummary[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [options, setOptions] = useState<SummaryOptions>({
    type: 'brief',
    length: 'medium',
    tone: 'professional',
    includeKeywords: true
  });

  // Auto-generate initial summary
  useEffect(() => {
    if (content && title) {
      generateNewSummary();
    }
  }, [content, title, contentType]);

  const generateNewSummary = async () => {
    if (!content || !title) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    const newSummary = generateSummary(content, title, contentType, options, tags);
    
    setSummaries(prev => [newSummary, ...prev.slice(0, 4)]); // Keep last 5 summaries
    onSummaryGenerated?.(newSummary);
    setIsGenerating(false);
  };

  const copyToClipboard = async (summary: GeneratedSummary) => {
    try {
      await navigator.clipboard.writeText(summary.content);
      setCopiedId(summary.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const getTypeIcon = (type: SummaryOptions['type']) => {
    switch (type) {
      case 'brief': return '⚡';
      case 'detailed': return '📋';
      case 'technical': return '🔧';
      case 'marketing': return '🎯';
      default: return '📝';
    }
  };

  const getTypeColor = (type: SummaryOptions['type']) => {
    switch (type) {
      case 'brief': return 'text-yellow-500';
      case 'detailed': return 'text-blue-500';
      case 'technical': return 'text-green-500';
      case 'marketing': return 'text-purple-500';
      default: return 'text-gray-500';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-500';
    if (confidence >= 0.6) return 'text-yellow-500';
    return 'text-red-500';
  };

  const currentSummary = summaries[0];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FiZap className="w-6 h-6 text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI-Generated Summary
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Intelligent summaries powered by AI
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-500 hover:text-primary transition-colors"
            title="Summary settings"
          >
            <FiSettings className="w-5 h-5" />
          </button>
          
          <button
            onClick={generateNewSummary}
            disabled={isGenerating}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <FiRefreshCw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'Regenerate'}
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-xl p-6 border border-primary/10"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Summary Settings
            </h3>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Summary Type
                </label>
                <select
                  value={options.type}
                  onChange={(e) => setOptions(prev => ({ ...prev, type: e.target.value as SummaryOptions['type'] }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="brief">Brief Overview</option>
                  <option value="detailed">Detailed Summary</option>
                  <option value="technical">Technical Focus</option>
                  <option value="marketing">Marketing Copy</option>
                </select>
              </div>

              {/* Length */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Length
                </label>
                <select
                  value={options.length}
                  onChange={(e) => setOptions(prev => ({ ...prev, length: e.target.value as SummaryOptions['length'] }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="short">Short (1-2 sentences)</option>
                  <option value="medium">Medium (2-3 sentences)</option>
                  <option value="long">Long (3+ sentences)</option>
                </select>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tone
                </label>
                <select
                  value={options.tone}
                  onChange={(e) => setOptions(prev => ({ ...prev, tone: e.target.value as SummaryOptions['tone'] }))}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="professional">Professional</option>
                  <option value="casual">Casual</option>
                  <option value="academic">Academic</option>
                </select>
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Options
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <input
                    type="checkbox"
                    checked={options.includeKeywords}
                    onChange={(e) => setOptions(prev => ({ ...prev, includeKeywords: e.target.checked }))}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  Include keywords
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Summary */}
      {currentSummary && (
        <div className="glass-card rounded-xl p-6 border border-primary/10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getTypeIcon(currentSummary.type)}</span>
              <div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm px-2 py-1 rounded-full bg-white/10 ${getTypeColor(currentSummary.type)}`}>
                    {currentSummary.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {currentSummary.length} • {currentSummary.tone}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiBookOpen className="w-3 h-3" />
                    {currentSummary.readingTime} min read
                  </span>
                  <span className={`flex items-center gap-1 ${getConfidenceColor(currentSummary.confidence)}`}>
                    <FiZap className="w-3 h-3" />
                    {Math.round(currentSummary.confidence * 100)}% confidence
                  </span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => copyToClipboard(currentSummary)}
              className="flex items-center gap-2 px-3 py-1 text-sm text-gray-500 hover:text-primary transition-colors"
            >
              {copiedId === currentSummary.id ? (
                <>
                  <FiCheck className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <FiCopy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          <p className="text-gray-900 dark:text-white leading-relaxed mb-4">
            {currentSummary.content}
          </p>

          {/* Keywords */}
          {currentSummary.keywords.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Key Topics:
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentSummary.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Loading State */}
      {isGenerating && (
        <div className="glass-card rounded-xl p-6 border border-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Generating AI Summary...
              </h3>
              <p className="text-sm text-gray-500">
                Analyzing content and extracting key insights
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      )}

      {/* Previous Summaries */}
      {summaries.length > 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Previous Summaries
          </h3>
          
          <div className="space-y-3">
            {summaries.slice(1).map((summary, index) => (
              <motion.div
                key={summary.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-lg p-4 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTypeIcon(summary.type)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full bg-white/10 ${getTypeColor(summary.type)}`}>
                      {summary.type}
                    </span>
                    <span className="text-xs text-gray-500">
                      {summary.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => copyToClipboard(summary)}
                    className="text-gray-400 hover:text-primary transition-colors"
                  >
                    {copiedId === summary.id ? (
                      <FiCheck className="w-4 h-4" />
                    ) : (
                      <FiCopy className="w-4 h-4" />
                    )}
                  </button>
                </div>
                
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {summary.content}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
