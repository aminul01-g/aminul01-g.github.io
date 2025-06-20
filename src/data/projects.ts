export interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
}

export const projects: Project[] = [
  {
    title: "aiStudyAssistant",
    description: "AI-powered study assistant application.",
    tags: ["AI", "Assistant", "React"],
    github: "https://github.com/aminul01-g/aiStudyAssistant"
  },
  {
    title: "LearnML",
    description: "Machine learning resources and notebooks.",
    tags: ["Machine Learning", "Python"],
    github: "https://github.com/aminul01-g/LearnML"
  },
  {
    title: "Predictive Modeling of Ames Housing Data",
    description: "A data science project for predictive modeling.",
    tags: ["Data Science", "Python"],
    github: "https://github.com/aminul01-g/Predictive-Modeling-of-Ames-Housing-Data"
  },
  {
    title: "titanic-survival-app",
    description: "Titanic survival prediction app.",
    tags: ["ML", "Python", "App"],
    github: "https://github.com/aminul01-g/titanic-survival-app"
  }
];
