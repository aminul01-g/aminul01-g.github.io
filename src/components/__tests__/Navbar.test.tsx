import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { MemoryRouter } from 'react-router-dom';

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText(/projects/i)).toBeInTheDocument();
    expect(screen.getByText(/blog/i)).toBeInTheDocument();
  });
});
