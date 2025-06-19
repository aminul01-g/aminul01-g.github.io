export interface Project { // <-- `export` keyword added to the type
    id: number;
    title: string;
    description: string;
    stack: string[];
    liveUrl: string | null;
    githubUrl: string;
    image: string;
}

export const projectsData: Project[] = [ // <-- `export` keyword added
  {
    id: 1,
    title: 'AI Study Assistant',
    description: 'An intelligent platform to help users summarize articles, generate questions, and chat with documents for an interactive learning experience.',
    stack: ['Next.js', 'Python', 'FastAPI', 'LangChain', 'Vercel'],
    liveUrl: '#',
    githubUrl: '#',
    image: 'https://placehold.co/600x400/0f172a/94a3b8?text=AI+Study+Assistant'
  },
  {
    id: 2,
    title: 'Ames Housing Prices (ML)',
    description: 'A regression model to predict housing prices in Ames, Iowa. This project covers data cleaning, feature engineering, and model evaluation.',
    stack: ['Scikit-learn', 'Pandas', 'Jupyter', 'Matplotlib'],
    liveUrl: '#',
    githubUrl: '#',
    image: 'https://placehold.co/600x400/0f172a/94a3b8?text=Ames+Housing+ML'
  },
  {
    id: 3,
    title: 'Titanic Survival Prediction',
    description: 'A classic binary classification problem. Built a model to predict passenger survival on the Titanic, deployed as a simple web app.',
    stack: ['Streamlit', 'Pandas', 'Seaborn', 'Scikit-learn'],
    liveUrl: '#',
    githubUrl: '#',
    image: 'https://placehold.co/600x400/0f172a/94a3b8?text=Titanic+App'
  },
  {
    id: 4,
    title: 'PyTorch Experiments',
    description: 'A repository of experiments implementing various neural networks and deep learning concepts from scratch using PyTorch.',
    stack: ['PyTorch', 'Python', 'Google Colab'],
    liveUrl: null,
    githubUrl: '#',
    image: 'https://placehold.co/600x400/0f172a/94a3b8?text=PyTorch+Experiments'
  },
];
