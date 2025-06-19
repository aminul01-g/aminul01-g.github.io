// =======================================================================
// File: /pages/blog/[slug].tsx (Final Corrected Version)
// This version adds the final type safety checks to satisfy TypeScript.
// =======================================================================
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
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
  content: string;
}

// Define the types for the params object from the context
interface IParams extends ParsedUrlQuery {
  slug: string;
}

// This is the actual React component for the page
const BlogPostPage = ({ frontmatter, content }: BlogPostProps) => {
  return (
     <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">
        <Navbar />
        <main className="max-w-3xl mx-auto py-16 px-6">
            <article className="prose prose-invert lg:prose-xl">
                <h1 className="text-4xl font-bold mb-2 text-white">{frontmatter.title}</h1>
                <p className="text-sm text-slate-400 mb-6">{new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="text-slate-300" dangerouslySetInnerHTML={{ __html: content }} />
            </article>
        </main>
        <Footer />
     </div>
  );
};

// This function tells Next.js which paths (blog posts) to pre-render
export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'data/blog');
  const filenames = fs.readdirSync(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: {
      slug: filename.replace(/\.md$/, ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// This function fetches the data for a specific blog post
export const getStaticProps: GetStaticProps = async (context) => {
  // Use the IParams interface to type the context parameters
  const { slug } = context.params as IParams;
  const postsDirectory = path.join(process.cwd(), 'data/blog');
  const filePath = path.join(postsDirectory, `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const htmlContent = marked(content);

    return {
      props: {
        frontmatter: data,
        content: htmlContent,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default BlogPostPage;
