import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// import { marked } from 'marked'; // <-- Temporarily disabled for debugging
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Define the types for the component's props
interface BlogPostProps {
  frontmatter: {
    title: string;
    date: string;
    description: string;
  };
  content: string; // This will now be raw markdown, not HTML
}

// Define the types for the params object from the context
interface IParams extends ParsedUrlQuery {
  slug: string;
}

// The page component itself
const BlogPostPage = ({ frontmatter, content }: BlogPostProps) => {
  return (
     <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">
        <Navbar />
        <main className="max-w-3xl mx-auto py-16 px-6">
            <article>
                <h1 className="text-4xl font-bold mb-2 text-white">{frontmatter.title}</h1>
                <p className="text-sm text-slate-400 mb-6">{new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                
                <h2 className="text-xl text-yellow-400 mt-8 mb-2">--- Raw Markdown (Debug View) ---</h2>
                {/* For debugging, we render the raw markdown in a preformatted block */}
                <pre className="whitespace-pre-wrap text-slate-300 bg-slate-800 p-4 rounded-md font-mono">{content}</pre>
            </article>
        </main>
        <Footer />
     </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const postsDirectory = path.join(process.cwd(), 'data/blog');
    const filenames = fs.readdirSync(postsDirectory);

    const paths = filenames.map((filename) => ({
      params: { slug: filename.replace(/\.md$/, '') },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
    const { slug } = context.params as IParams;
    const filePath = path.join(process.cwd(), 'data/blog', `${slug}.md`);

    try {
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        // THE DEBUGGING CHANGE IS HERE: We are not parsing the markdown. We pass the raw content directly.
        // const htmlContent = await marked.parse(content); // <-- Temporarily disabled

        return {
          props: {
            frontmatter: data,
            content: content, // Pass the raw markdown content
          },
        };
    } catch (error) {
        return { notFound: true };
    }
};

export default BlogPostPage;
