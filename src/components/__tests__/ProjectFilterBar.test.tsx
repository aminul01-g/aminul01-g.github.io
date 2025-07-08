import { render, screen, fireEvent } from '@testing-library/react';
import ProjectFilterBar from '../ProjectFilterBar';

describe('ProjectFilterBar', () => {
  const tags = ['AI', 'Web', 'ML'];
  const onFilter = jest.fn();
  const onSearch = jest.fn();

  it('renders all filter tags', () => {
    render(
      <ProjectFilterBar tags={tags} activeTag={null} onFilter={onFilter} onSearch={onSearch} />,
    );
    tags.forEach((tag) => {
      expect(screen.getByText(`#${tag}`)).toBeInTheDocument();
    });
  });

  it('calls onFilter when a tag is clicked', () => {
    render(
      <ProjectFilterBar tags={tags} activeTag={null} onFilter={onFilter} onSearch={onSearch} />,
    );
    fireEvent.click(screen.getByText('#AI'));
    expect(onFilter).toHaveBeenCalledWith('AI');
  });
});
