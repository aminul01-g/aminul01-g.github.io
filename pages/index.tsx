import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import AboutSection from '../components/AboutSection';
import BlogSection from '../components/BlogSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { getSortedPostsData } from '../lib/posts';

// The Home component now receives `allPostsData` as a prop
export default function Home({ allPostsData }) {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HeroSection />
        <div id="projects"><ProjectsSection /></div>
        <div id="about"><AboutSection /></div>
        {/* Here, we pass the fetched data into the component */}
        <div id="blog"><BlogSection allPostsData={allPostsData} /></div>
        <div id="contact"><ContactSection /></div>
      </main>
      <Footer />
    </div>
  );
}

// getStaticProps runs at build time to fetch the data needed for the page.
export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}