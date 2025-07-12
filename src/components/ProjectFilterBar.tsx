import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterState {
  search: string;
  selectedTags: string[];
  sortBy: 'date' | 'name' | 'popularity' | 'technology';
  sortOrder: 'asc' | 'desc';
}

export default function ProjectFilterBar({
  tags,
  onFilter,
  onSearch,
  onSort,
  activeTag,
}: {
  tags: string[];
  onFilter: (tags: string[]) => void;
  onSearch: (q: string) => void;
  onSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  activeTag?: string | null;
}): React.ReactElement {
  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    selectedTags: activeTag ? [activeTag] : [],
    sortBy: 'name',
    sortOrder: 'asc',
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSearchChange = (value: string) => {
    setFilterState(prev => ({ ...prev, search: value }));
    onSearch(value);
  };

  const handleTagToggle = (tag: string) => {
    setFilterState(prev => {
      const newTags = prev.selectedTags.includes(tag)
        ? prev.selectedTags.filter(t => t !== tag)
        : [...prev.selectedTags, tag];
      onFilter(newTags);
      return { ...prev, selectedTags: newTags };
    });
  };

  const handleSortChange = (sortBy: FilterState['sortBy'], sortOrder: 'asc' | 'desc') => {
    setFilterState(prev => ({ ...prev, sortBy, sortOrder }));
    onSort(sortBy, sortOrder);
  };

  const clearAllFilters = () => {
    setFilterState({
      search: '',
      selectedTags: [],
      sortBy: 'date',
      sortOrder: 'desc',
    });
    onFilter([]);
    onSearch('');
    onSort('date', 'desc');
  };

  return (
    <motion.div 
      className="w-full space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search Bar */}
      <div className="relative">
        <motion.input
          type="text"
          placeholder="Search projects by title, description, or technology..."
          value={filterState.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-primary/20 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          aria-label="Search projects"
          whileFocus={{ scale: 1.02 }}
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={`${filterState.sortBy}-${filterState.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-');
              handleSortChange(sortBy as FilterState['sortBy'], sortOrder as 'asc' | 'desc');
            }}
            className="px-3 py-2 rounded-lg border border-primary/20 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="name-asc">Name A-Z</option>
            <option value="name-desc">Name Z-A</option>
            <option value="technology-asc">Technology A-Z</option>
          </select>
        </div>

        {/* Advanced Filters Toggle */}
        <motion.button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-3 py-2 rounded-lg border border-primary/20 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-primary/5 dark:hover:bg-gray-800 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </motion.button>

        {/* Clear All */}
        {(filterState.search || filterState.selectedTags.length > 0) && (
          <motion.button
            onClick={clearAllFilters}
            className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            Clear All
          </motion.button>
        )}
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {/* Tag Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Technology ({filterState.selectedTags.length} selected)
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <motion.button
                    key={tag}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 py-1 rounded-full font-semibold text-xs transition-all ${
                      filterState.selectedTags.includes(tag)
                        ? 'bg-primary text-white shadow-lg'
                        : 'bg-primary/10 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 hover:bg-primary/20 dark:hover:bg-indigo-900/50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tags.indexOf(tag) * 0.05 }}
                  >
                    #{tag}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Active Filters Display */}
            {filterState.selectedTags.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 items-center"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                {filterState.selectedTags.map((tag) => (
                  <motion.span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-primary text-xs"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                  >
                    #{tag}
                    <button
                      onClick={() => handleTagToggle(tag)}
                      className="ml-1 hover:text-red-500 transition-colors"
                      aria-label={`Remove ${tag} filter`}
                    >
                      ×
                    </button>
                  </motion.span>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
