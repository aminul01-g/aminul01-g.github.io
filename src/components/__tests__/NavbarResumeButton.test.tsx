import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import { BrowserRouter } from 'react-router-dom';

describe('Navbar Resume Button', () => {
  it('renders Download Resume button with correct link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const resumeButton = screen.getByText(/download resume/i);
    expect(resumeButton).toBeInTheDocument();
    expect(resumeButton.closest('a')).toHaveAttribute('href', '/resume.pdf');
  });
});
