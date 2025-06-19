export interface Project {
    id: number;
    title: string;
    description: string;
    stack: string[];
    liveUrl: string | null;
    githubUrl: string;
    image: string;
}

export const projectsData: Project[] = [
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
];