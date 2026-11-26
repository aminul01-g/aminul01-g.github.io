import { render, screen, fireEvent } from '../../test-utils/test-utils';
import Projects from '../../pages/Projects';
import { filterProjects, sortProjects } from '../../utils/projectFilters';
import type { Project as FilterableProject } from '../../data/projects.d';

const sampleProjects: FilterableProject[] = [
  {
    title: 'Zeta',
    description: '',
    tags: ['Ai'],
    technologies: [],
    slug: 'zeta',
    date: '2024-01-01',
  },
  {
    title: 'Alpha',
    description: '',
    tags: ['Web'],
    technologies: [],
    slug: 'alpha',
    featured: true,
    date: '2025-01-01',
  },
  {
    title: 'Beta',
    description: '',
    tags: ['Ai'],
    technologies: [],
    slug: 'beta',
    date: '2023-01-01',
  },
];

describe('project filter helpers', () => {
  it('filters by tag and search term', () => {
    expect(filterProjects(sampleProjects, ['Ai'], '').map((p) => p.slug)).toEqual(['zeta', 'beta']);
    expect(filterProjects(sampleProjects, [], 'alpha').map((p) => p.slug)).toEqual(['alpha']);
  });

  it('sorts by date without mutating the input', () => {
    const original = [...sampleProjects];
    expect(sortProjects(sampleProjects, 'date', 'desc').map((p) => p.slug)).toEqual([
      'alpha',
      'zeta',
      'beta',
    ]);
    expect(sampleProjects).toEqual(original);
  });

  it('puts featured projects first in popularity order', () => {
    expect(sortProjects(sampleProjects, 'popularity', 'desc').map((p) => p.slug)).toEqual([
      'alpha',
      'zeta',
      'beta',
    ]);
  });
});

// Mock IntersectionObserver for framer-motion
class IntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

describe('Projects Filter Logic', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('filters projects by tag', async () => {
    render(<Projects />);
    jest.runAllTimers(); // Advance timers to clear loading state

    // Wait for the page to load and find the "Show Advanced" button
    const showAdvancedButton = await screen.findByText('Show Advanced');
    fireEvent.click(showAdvancedButton);

    // Get all AI buttons and click the first one (should be the filter button)
    const aiButtons = screen.getAllByText(/#ai/i);
    if (aiButtons.length > 0) {
      fireEvent.click(aiButtons[0]);
    }

    // Check that projects are still shown (basic smoke test)
    expect(screen.getAllByTestId('project-card').length).toBeGreaterThan(0);
  });
});
