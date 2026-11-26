import type { Project } from '../data/projects.d';

export type SortBy = 'name' | 'technology' | 'date' | 'popularity';
export type SortOrder = 'asc' | 'desc';

export const SORT_OPTIONS: Array<{ value: `${SortBy}-${SortOrder}`; label: string }> = [
  { value: 'popularity-desc', label: 'Featured first' },
  { value: 'date-desc', label: 'Newest first' },
  { value: 'date-asc', label: 'Oldest first' },
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'technology-asc', label: 'Technology A-Z' },
];

export const DEFAULT_SORT: `${SortBy}-${SortOrder}` = 'popularity-desc';

/** Pure filter — OR across tags, case-insensitive search across title/description/tags. */
export function filterProjects(projects: Project[], tags: string[], search: string): Project[] {
  const query = search.trim().toLowerCase();
  return projects.filter((project) => {
    const matchesTags = tags.length === 0 || tags.some((tag) => (project.tags || []).includes(tag));
    const matchesSearch =
      !query ||
      `${project.title} ${project.description} ${(project.tags || []).join(' ')}`
        .toLowerCase()
        .includes(query);
    return matchesTags && matchesSearch;
  });
}

/** Pure sort — returns a new array; never mutates input. */
export function sortProjects(projects: Project[], sortBy: SortBy, sortOrder: SortOrder): Project[] {
  const direction = sortOrder === 'asc' ? 1 : -1;
  return [...projects].sort((a, b) => {
    let comparison = 0;
    switch (sortBy) {
      case 'name':
        comparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        break;
      case 'technology':
        comparison = (a.tags || [])
          .join(' ')
          .toLowerCase()
          .localeCompare((b.tags || []).join(' ').toLowerCase());
        break;
      case 'date':
        comparison = (a.date || '').localeCompare(b.date || '');
        break;
      case 'popularity': {
        // Featured first, newest first; a natural order independent of the
        // ascending/descending toggle used by other sort modes.
        if (Boolean(a.featured) !== Boolean(b.featured)) return a.featured ? -1 : 1;
        return (b.date || '').localeCompare(a.date || '');
      }
      default:
        return 0;
    }
    return direction * comparison;
  });
}
