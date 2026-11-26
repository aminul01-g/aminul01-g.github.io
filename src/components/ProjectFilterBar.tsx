import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEFAULT_SORT, SORT_OPTIONS, type SortBy, type SortOrder } from '../utils/projectFilters';

interface FilterState {
  search: string;
  selectedTags: string[];
  sortBy: SortBy;
  sortOrder: SortOrder;
}

interface ProjectFilterBarProps {
  tags: string[];
  onFilter: (tags: string[]) => void;
  onSearch: (q: string) => void;
  onSort: (sortBy: string, sortOrder: SortOrder) => void;
  activeTag?: string | null;
  /** Controlled values. When supplied by the parent they are the source of truth. */
  selectedTags?: string[];
  search?: string;
  sortBy?: SortBy;
  sortOrder?: SortOrder;
}

const [defaultSortBy, defaultSortOrder] = DEFAULT_SORT.split('-') as [SortBy, SortOrder];

export default function ProjectFilterBar({
  tags,
  onFilter,
  onSearch,
  onSort,
  activeTag,
  selectedTags: controlledTags,
  search: controlledSearch,
  sortBy: controlledSortBy,
  sortOrder: controlledSortOrder,
}: ProjectFilterBarProps): React.ReactElement {
  const [filterState, setFilterState] = useState<FilterState>({
    search: controlledSearch ?? '',
    selectedTags: controlledTags ?? (activeTag ? [activeTag] : []),
    sortBy: controlledSortBy ?? defaultSortBy,
    sortOrder: controlledSortOrder ?? defaultSortOrder,
  });
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Keep in sync when the parent changes state (e.g. browser back/forward).
  useEffect(() => {
    setFilterState({
      search: controlledSearch ?? '',
      selectedTags: controlledTags ?? [],
      sortBy: controlledSortBy ?? defaultSortBy,
      sortOrder: controlledSortOrder ?? defaultSortOrder,
    });
  }, [controlledSearch, controlledTags, controlledSortBy, controlledSortOrder]);

  const handleSearchChange = (value: string) => {
    setFilterState((prev) => ({ ...prev, search: value }));
    onSearch(value);
  };

  const handleTagToggle = (tag: string) => {
    // Compute outside the state updater — calling onFilter there is a side effect.
    const newTags = filterState.selectedTags.includes(tag)
      ? filterState.selectedTags.filter((t) => t !== tag)
      : [...filterState.selectedTags, tag];
    setFilterState((prev) => ({ ...prev, selectedTags: newTags }));
    onFilter(newTags);
  };

  const handleSortChange = (sortBy: SortBy, sortOrder: SortOrder) => {
    setFilterState((prev) => ({ ...prev, sortBy, sortOrder }));
    onSort(sortBy, sortOrder);
  };

  const clearAllFilters = () => {
    setFilterState({
      search: '',
      selectedTags: [],
      sortBy: defaultSortBy,
      sortOrder: defaultSortOrder,
    });
    onFilter([]);
    onSearch('');
    onSort(defaultSortBy, defaultSortOrder);
  };

  return (
    <motion.div
      className="w-full space-y-4"
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <motion.input
          type="text"
          placeholder="Search projects by title, description, or technology..."
          value={filterState.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-primary/20 dark:border-gray-700 glass-card text-[var(--theme-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          aria-label="Search projects"
          whileFocus={{ scale: 1.02 }}
        />
        <svg
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--theme-text-primary)] text-opacity-70"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            aria-label="Sort projects"
            value={`${filterState.sortBy}-${filterState.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split('-') as [SortBy, SortOrder];
              handleSortChange(sortBy, sortOrder);
            }}
            className="px-3 py-2 rounded-lg border border-primary/20 dark:border-gray-700 glass-card text-[var(--theme-text-primary)] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <motion.button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="px-3 py-2 rounded-lg border border-primary/20 dark:border-gray-700 glass-card text-[var(--theme-text-primary)] hover:bg-primary/5 hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-expanded={showAdvanced}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </motion.button>

        {(filterState.search || filterState.selectedTags.length > 0) && (
          <motion.button
            onClick={clearAllFilters}
            className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
          >
            Clear All
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            initial={false}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div>
              <h3 className="text-sm font-medium text-[var(--theme-text-primary)] mb-2">
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
                    initial={false}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tags.indexOf(tag) * 0.05 }}
                    aria-pressed={filterState.selectedTags.includes(tag)}
                  >
                    #{tag}
                  </motion.button>
                ))}
              </div>
            </div>

            {filterState.selectedTags.length > 0 && (
              <motion.div
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 items-center"
              >
                <span className="text-sm text-[var(--theme-text-primary)] text-opacity-70">
                  Active filters:
                </span>
                {filterState.selectedTags.map((tag) => (
                  <motion.span
                    key={tag}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/20 text-[var(--link)] text-xs"
                    initial={false}
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
