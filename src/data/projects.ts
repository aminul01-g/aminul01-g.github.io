export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  thumbnail?: string; // Optional thumbnail image URL or emoji
}

export const projects: Project[] = [
  {
    title: "aiStudyAssistant",
    description: "AI-powered study assistant application.",
    tags: ["AI", "Assistant", "React"],
    github: "https://github.com/aminul01-g/aiStudyAssistant",
    thumbnail: "https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo192.png" // Example image
  },
  {
    title: "LearnML",
    description: "Machine learning resources and notebooks.",
    tags: ["Machine Learning", "Python"],
    github: "https://github.com/aminul01-g/LearnML",
    thumbnail: "https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo512.png"
  },
  {
    title: "Predictive Modeling of Ames Housing Data",
    description: "A data science project for predictive modeling.",
    tags: ["Data Science", "Python"],
    github: "https://github.com/aminul01-g/Predictive-Modeling-of-Ames-Housing-Data",
    thumbnail: "https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo192.png"
  },
  {
    title: "titanic-survival-app",
    description: "Titanic survival prediction app.",
    tags: ["ML", "Python", "App"],
    github: "https://github.com/aminul01-g/titanic-survival-app",
    thumbnail: "https://cdn.jsdelivr.net/gh/aminul01-g/aminul01-g.github.io/public/logo512.png"
  }
];
