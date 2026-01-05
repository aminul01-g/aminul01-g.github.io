export interface Project {
  title: string;
  description: string;
  tags: string[];
  technologies: string[];
  github: string;
  slug: string;
  thumbnail?: string;
  demoUrl?: string;
  featured?: boolean;
  date?: string;
  role?: string;
  highlights?: string[];
  challenges?: string[];
  results?: string[];
  videoUrl?: string;
}

export const projects: Project[];
