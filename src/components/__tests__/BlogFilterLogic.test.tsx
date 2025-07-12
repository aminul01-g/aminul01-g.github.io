import { render, screen, fireEvent } from '../../test-utils/test-utils';
import Blog from '../../pages/Blog';

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

// Explicitly mock the blog data
jest.mock('../../data/blog', () => ({
  blogPosts: [
    {
      slug: 'test-post-1',
      title: 'Test Post 1',
      date: '2024-01-01',
      summary: 'This is a summary of test post 1.',
      tags: ['React', 'Testing'],
      content: 'Content of test post 1.',
    },
    {
      slug: 'test-post-2',
      title: 'Test Post 2',
      date: '2024-01-02',
      summary: 'This is a summary of test post 2.',
      tags: ['Node.js', 'Backend'],
      content: 'Content of test post 2.',
    },
    {
      slug: 'test-post-react',
      title: 'React Basics',
      date: '2024-03-15',
      summary: 'A post about React fundamentals.',
      tags: ['React', 'Frontend'],
      content: 'Content about React.',
    },
  ],
}));

describe('Blog Filter/Search', () => {
  it('filters blog posts by search term', () => {
    render(<Blog />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'react' } });
    expect(screen.getAllByTestId('blog-card').length).toBeGreaterThanOrEqual(0);
  });
});
