export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  thumbnail?: string; // Optional thumbnail image URL or emoji
}

export const projects: Project[] = [
  {
    title: 'aiStudyAssistant',
    description: 'AI-powered study assistant application.',
    tags: ['AI', 'Assistant', 'React'],
    github: 'https://github.com/aminul01-g/aiStudyAssistant',
    thumbnail: 'https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo192.png', // Example image
  },
  {
    title: 'LearnML',
    description: 'Machine learning resources and notebooks.',
    tags: ['Machine Learning', 'Python'],
    github: 'https://github.com/aminul01-g/LearnML',
    thumbnail: 'https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo512.png',
  },
  {
    title: 'Predictive Modeling of Ames Housing Data',
    description: 'A data science project for predictive modeling.',
    tags: ['Data Science', 'Python'],
    github: 'https://github.com/aminul01-g/Predictive-Modeling-of-Ames-Housing-Data',
    thumbnail: 'https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo192.png',
  },
  {
    title: 'titanic-survival-app',
    description: 'Titanic survival prediction app.',
    tags: ['ML', 'Python', 'App'],
    github: 'https://github.com/aminul01-g/titanic-survival-app',
    thumbnail: 'https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo512.png',
  },
  // Additional projects fetched from GitHub
  {
    title: 'Diabetes-Detection-System',
    description:
      'Binary classification model that predicts whether a person has diabetes or not based on medical features.',
    tags: ['ML', 'Python', 'Health'],
    github: 'https://github.com/aminul01-g/Diabetes-Detection-System',
    thumbnail: 'https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo192.png',
  },
  {
    title: 'Learn_AI_Engineering',
    description: 'Resources and notes for learning AI engineering.',
    tags: ['AI', 'Engineering', 'Notes'],
    github: 'https://github.com/aminul01-g/Learn_AI_Engineering',
    thumbnail: 'https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo512.png',
  },
  {
    title: 'linux-tools',
    description: 'A collection of useful Linux command-line tools and scripts.',
    tags: ['Linux', 'Tools', 'Shell'],
    github: 'https://github.com/aminul01-g/linux-tools',
    thumbnail: 'https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo192.png',
  },
  {
    title: 'pythonProjects',
    description: 'Various Python projects and experiments.',
    tags: ['Python', 'Projects'],
    github: 'https://github.com/aminul01-g/pythonProjects',
    thumbnail: 'https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo512.png',
  },
];
