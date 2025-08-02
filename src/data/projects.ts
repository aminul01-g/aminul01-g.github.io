import type { Project } from './projects.d';

export const projects: Project[] = [
  {
    title: 'aiStudyAssistant',
    description:
      'AI-powered study assistant application that helps students learn more effectively using machine learning algorithms to personalize study plans and track progress.',
    tags: ['AI', 'Education', 'React'],
    technologies: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'TensorFlow.js'],
    github: 'https://github.com/aminul01-g/aiStudyAssistant',
    slug: 'aistudyassistant',
    thumbnail: '🤖',
    demoUrl: 'https://aistudyassistant.vercel.app',
    featured: true,
    date: '2023-10-15',
    role: 'Full Stack Developer',
    highlights: [
      'Built with modern React hooks and context API',
      'Integrated machine learning models for personalized learning',
      'Real-time progress tracking and analytics',
    ],
  },
  {
    title: 'LearnML',
    description:
      'Comprehensive machine learning resources and interactive Jupyter notebooks covering fundamental to advanced ML concepts.',
    tags: ['Machine Learning', 'Education', 'Python'],
    technologies: ['Python', 'Jupyter', 'scikit-learn', 'TensorFlow', 'PyTorch'],
    github: 'https://github.com/aminul01-g/LearnML',
    slug: 'learnml',
    thumbnail: '📚',
    demoUrl: 'https://learnml.vercel.app',
    featured: true,
    date: '2023-08-22',
    role: 'Content Creator & Developer',
  },
  {
    title: 'Predictive Modeling of Ames Housing Data',
    description:
      'End-to-end data science project performing exploratory data analysis and predictive modeling on the Ames Housing dataset.',
    tags: ['Data Science', 'Regression', 'Python'],
    technologies: ['Python', 'pandas', 'numpy', 'scikit-learn', 'matplotlib'],
    github: 'https://github.com/aminul01-g/Predictive-Modeling-of-Ames-Housing-Data',
    slug: 'ames-housing-prediction',
    thumbnail: '🏠',
    demoUrl:
      'https://colab.research.google.com/github/aminul01-g/Predictive-Modeling-of-Ames-Housing-Data',
    date: '2023-05-10',
    role: 'Data Scientist',
  },
  {
    title: 'Titanic Survival Prediction',
    description:
      'Machine learning model that predicts passenger survival on the Titanic using various classification algorithms.',
    tags: ['Classification', 'Python', 'ML'],
    technologies: ['Python', 'scikit-learn', 'pandas', 'seaborn'],
    github: 'https://github.com/aminul01-g/titanic-survival-app',
    slug: 'titanic-survival',
    thumbnail: '🚢',
    demoUrl: 'https://titanic-survival-predictor.streamlit.app',
    date: '2023-03-15',
    role: 'Machine Learning Engineer',
  },
  {
    title: 'Diabetes Detection System',
    description:
      'Binary classification model that predicts diabetes risk based on diagnostic measurements.',
    tags: ['Healthcare', 'ML', 'Python'],
    technologies: ['Python', 'scikit-learn', 'Flask', 'Docker'],
    github: 'https://github.com/aminul01-g/Diabetes-Detection-System',
    slug: 'diabetes-detection',
    thumbnail: '🏥',
    date: '2023-02-01',
    role: 'ML Engineer',
    highlights: [
      'Achieved 78% accuracy on test dataset',
      'Built REST API for model inference',
      'Containerized with Docker for easy deployment',
    ],
  },
  {
    title: 'AI Engineering Resources',
    description:
      'Curated collection of resources, tutorials, and best practices for AI and machine learning engineering.',
    tags: ['AI', 'Engineering', 'Resources'],
    technologies: ['Python', 'Machine Learning', 'MLOps', 'Docker', 'Kubernetes'],
    github: 'https://github.com/aminul01-g/Learn_AI_Engineering',
    slug: 'ai-engineering-resources',
    thumbnail: '🧠',
    date: '2023-01-15',
    role: 'Content Curator',
    featured: true,
  },
];
