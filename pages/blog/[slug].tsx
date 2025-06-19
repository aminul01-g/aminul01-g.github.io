import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { GetStaticProps, GetStaticPaths } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { remark } from 'remark';
import html from 'remark-html';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

interface BlogPostProps {
  frontmatter: {
    title: string;
    date: string;
    description: string;
  };
  contentHtml: string;
}

interface IParams extends ParsedUrlQuery {
  slug: string;
}

const BlogPostPage = ({ frontmatter, contentHtml }: BlogPostProps) => {
  return (
     <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">
        <Navbar />
        <main className="max-w-3xl mx-auto py-16 px-6">
            <article className="prose prose-invert lg:prose-xl">
                <h1 className="text-4xl font-bold mb-2 text-white">{frontmatter.title}</h1>
                <p className="text-sm text-slate-400 mb-6">{new Date(frontmatter.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <div className="text-slate-300" dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </article>
        </main>
        <Footer />
     </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Use path.resolve for a guaranteed absolute path
  const postsDirectory = path.resolve(process.cwd(), 'data/blog');
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

export const getStaticProps: GetStaticProps<BlogPostProps, IParams> = async (context) => {
  const { slug } = context.params!;
  // Use path.resolve for a guaranteed absolute path
  const filePath = path.resolve(process.cwd(), 'data/blog', `${slug}.md`);

  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const matterResult = matter(fileContents);
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

    return {
      props: {
        frontmatter: matterResult.data as { title: string; date: string; description: string; },
        contentHtml,
      },
    };
  } catch (error) {
    console.error(`Error processing slug "${slug}":`, error);
    return { notFound: true };
  }
};

export default BlogPostPage;
