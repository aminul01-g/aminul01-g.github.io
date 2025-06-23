export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "getting-started-with-ai",
    title: "🧠 Getting Started with AI: My Journey from Beginner to Engineer",
    date: "2025-06-15",
    summary: "In this post, I share how I started learning AI from scratch, the courses and tools I used, and the mindset that helped me stick with it. If you're just beginning your AI journey, this roadmap might be helpful for you!"
  },
  {
    slug: "building-my-first-ai-project",
    title: "🤖 Building My First AI Project: A Smart Study Assistant with Python",
    date: "2025-06-20",
    summary: "I built a personal study assistant using Python and simple AI tools that helps organize tasks, generate summaries, and interact like a chatbot. Here’s what I learned, what went wrong, and how you can build something similar."
  },
  {
    slug: "what-is-prompt-engineering",
    title: "🧩 What Is Prompt Engineering? Why It Matters in the Age of AI Assistants",
    date: "2025-06-25",
    summary: "Prompt engineering is becoming one of the most powerful skills in the world of AI. In this blog, I explain what it is, how it works with tools like ChatGPT, and how even beginners can master it."
  }
];