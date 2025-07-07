import { render, screen, fireEvent } from '@testing-library/react';
import Projects from '../../pages/Projects';
import { MemoryRouter } from 'react-router-dom';

describe('Projects Filter Logic', () => {
  it('filters projects by tag', async () => {
    render(
      <MemoryRouter>
        <Projects />
      </MemoryRouter>
    );
    // Wait for filter bar and click a tag
    const tagButton = await screen.findByRole('button', { name: /filter by/i });
    if (tagButton) {
      fireEvent.click(tagButton);
      // Check that only filtered projects are shown
      // (This is a basic smoke test; for more, mock data or use test ids)
      expect(screen.getAllByRole('article').length).toBeGreaterThan(0);
    }
  });
});
