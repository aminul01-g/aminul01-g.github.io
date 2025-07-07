import { render, screen } from '@testing-library/react';
import ProjectCard, { ProjectCardProps } from '../ProjectCard';

describe('ProjectCard', () => {
  const mockProps: ProjectCardProps = {
    title: 'Test Project',
    description: 'A test project',
    tags: ['React', 'TypeScript'],
    github: 'https://github.com/example',
    thumbnail: 'test.png',
  };

  it('renders project title and description', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project')).toBeInTheDocument();
  });

  it('renders project tags', () => {
    render(<ProjectCard {...mockProps} />);
    expect(screen.getByText('#React')).toBeInTheDocument();
    expect(screen.getByText('#TypeScript')).toBeInTheDocument();
  });
});
