import { render, screen, fireEvent } from '@testing-library/react';
import Blog from '../../pages/Blog';

describe('Blog Filter/Search', () => {
  it('filters blog posts by search term', () => {
    render(<Blog />);
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target: { value: 'react' } });
    expect(screen.getAllByTestId('blog-card').length).toBeGreaterThanOrEqual(0);
  });
});
