import { render, screen } from '@testing-library/react';
import NotFound from '../NotFound';
import { MemoryRouter } from 'react-router-dom';

describe('NotFound Page', () => {
  it('renders 404 message', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
