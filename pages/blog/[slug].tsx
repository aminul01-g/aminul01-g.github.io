import { GetStaticProps, GetStaticPaths } from 'next';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// The props are now hardcoded
interface BlogPostProps {
  title: string;
  date: string;
  contentHtml: string;
}

const BlogPostPage = ({ title, date, contentHtml }: BlogPostProps) => {
  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 font-sans">
      <Navbar />
      <main className="max-w-3xl mx-auto py-16 px-6">
        <article className="prose prose-invert lg:prose-xl">
          <h1 className="text-4xl font-bold mb-2 text-white">{title}</h1>
          <p className="text-sm text-slate-400 mb-6">{date}</p>
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        </article>
      </main>
      <Footer />
    </div>
  );
};

// getStaticPaths now only returns one hardcoded path for 'first-post'
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { slug: 'first-post' } }],
    fallback: false,
  };
};

// getStaticProps now returns hardcoded data. It does NOT read any files.
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      title: 'Hardcoded Title For Debugging',
      date: '2025-06-20',
      contentHtml: '<p>This is hardcoded HTML content. If you see this, the build worked.</p>',
    },
  };
};

export default BlogPostPage;
