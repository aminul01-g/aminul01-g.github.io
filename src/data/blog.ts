export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
}

export const blogPosts: BlogPost[] = [
  // Example post
  {
    slug: "welcome-to-my-blog",
    title: "Welcome to My Blog",
    date: "2025-06-20",
    summary: "This is the first post on my portfolio blog. More content coming soon!"
  }
];


// Add more blog posts as needed