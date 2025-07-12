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
    thumbnail: '🤖', // Using emoji instead of generic logo
  },
  {
    title: 'LearnML',
    description: 'Machine learning resources and notebooks.',
    tags: ['Machine Learning', 'Python'],
    github: 'https://github.com/aminul01-g/LearnML',
    thumbnail: '📚', // Using emoji instead of generic logo
  },
  {
    title: 'Predictive Modeling of Ames Housing Data',
    description: 'A data science project for predictive modeling.',
    tags: ['Data Science', 'Python'],
    github: 'https://github.com/aminul01-g/Predictive-Modeling-of-Ames-Housing-Data',
    thumbnail: '🏠', // Using emoji instead of generic logo
  },
  {
    title: 'titanic-survival-app',
    description: 'Titanic survival prediction app.',
    tags: ['ML', 'Python', 'App'],
    github: 'https://github.com/aminul01-g/titanic-survival-app',
    thumbnail: '🚢', // Using emoji instead of generic logo
  },
  // Additional projects fetched from GitHub
  {
    title: 'Diabetes-Detection-System',
    description:
      'Binary classification model that predicts whether a person has diabetes or not based on medical features.',
    tags: ['ML', 'Python', 'Health'],
    github: 'https://github.com/aminul01-g/Diabetes-Detection-System',
    thumbnail: '🏥', // Using emoji instead of generic logo
  },
  {
    title: 'Learn_AI_Engineering',
    description: 'Resources and notes for learning AI engineering.',
    tags: ['AI', 'Engineering', 'Notes'],
    github: 'https://github.com/aminul01-g/Learn_AI_Engineering',
    thumbnail: '🧠', // Using emoji instead of generic logo
  },
  {
    title: 'linux-tools',
    description: 'A collection of useful Linux command-line tools and scripts.',
    tags: ['Linux', 'Tools', 'Shell'],
    github: 'https://github.com/aminul01-g/linux-tools',
    thumbnail: '🐧', // Using emoji instead of generic logo
  },
  {
    title: 'pythonProjects',
    description: 'Various Python projects and experiments.',
    tags: ['Python', 'Projects'],
    github: 'https://github.com/aminul01-g/pythonProjects',
    thumbnail: '🐍', // Using emoji instead of generic logo
  },
];
