import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { GetStaticProps } from 'next';

// Import Node.js modules for file system access
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Define the shape of a single blog post's data
interface PostData {
  slug: string;
  date: string;
  title: string;
  description: string;
}

// Define the shape of the props object for the Home page
interface HomeProps {
  allPostsData: PostData[];
}

// Apply the HomeProps type to the Home component
export default function Home({ allPostsData }: HomeProps) {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <div id="projects"><ProjectsSection /></div>
        <div id="about"><AboutSection /></div>
        <div id="blog"><BlogSection allPostsData={allPostsData} /></div>
        <div id="contact"><ContactSection /></div>
      </main>
      <Footer />
    </div>
  );
}

// getStaticProps now has a return type for better type safety
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const postsDirectory = path.join(process.cwd(), 'data/blog');
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    return {
      slug,
      ...(matterResult.data as { date: string; title: string; description: string }),
    };
  });

  const sortedPosts = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return {
    props: {
      allPostsData: sortedPosts,
    },
  };
}