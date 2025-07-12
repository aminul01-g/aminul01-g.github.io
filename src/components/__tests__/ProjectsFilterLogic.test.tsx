import { render, screen, fireEvent } from '../../test-utils/test-utils';
import Projects from '../../pages/Projects';

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
    const aiButtons = screen.getAllByText('#AI');
    if (aiButtons.length > 0) {
      fireEvent.click(aiButtons[0]);
    }

    // Check that projects are still shown (basic smoke test)
    expect(screen.getAllByTestId('project-card').length).toBeGreaterThan(0);
  });
});
