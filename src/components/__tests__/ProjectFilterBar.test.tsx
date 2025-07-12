import { render, screen, fireEvent } from '@testing-library/react';
import ProjectFilterBar from '../ProjectFilterBar';

describe('ProjectFilterBar', () => {
  const tags = ['AI', 'Web', 'ML'];
  const onFilter = jest.fn();
  const onSearch = jest.fn();
  const onSort = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all filter tags when advanced is shown', () => {
    render(
      <ProjectFilterBar
        tags={tags}
        activeTag={null}
        onFilter={onFilter}
        onSearch={onSearch}
        onSort={onSort}
      />
    );

    // Click "Show Advanced" to reveal tag buttons
    fireEvent.click(screen.getByText('Show Advanced'));

    // Now check for tag buttons
    tags.forEach((tag) => {
      expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
    });
  });

  it('calls onFilter when a tag is clicked', () => {
    render(
      <ProjectFilterBar
        tags={tags}
        activeTag={null}
        onFilter={onFilter}
        onSearch={onSearch}
        onSort={onSort}
      />
    );

    // Click "Show Advanced" to reveal tag buttons
    fireEvent.click(screen.getByText('Show Advanced'));

    // Now click on a tag
    fireEvent.click(screen.getByText('#AI'));
    expect(onFilter).toHaveBeenCalledWith(['AI']);
  });
});
