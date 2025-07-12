import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Comments from '../components/Comments';
import { BlogPost, blogPosts } from '../data/blog';
import BlockContent from '@sanity/block-content-to-react';
import SocialShare from '../components/SocialShare';
import FeedbackWidget from '../components/FeedbackWidget';
import BlogPostSkeleton from '../components/BlogPostSkeleton';

export default function Post(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = React.useState<BlogPost | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Use mock data instead of Sanity fetch
    const foundPost = blogPosts.find((p) => p.slug === slug);
    setPost(foundPost || null);
    setLoading(false);
  }, [slug]);

  if (loading) {
    return <BlogPostSkeleton />;
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This blog post is not available. It may be coming soon or has been removed.
        </p>
        <a href="/blog" className="text-primary hover:underline">
          ← Back to Blog
        </a>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>
          {post?.title
            ? `${post.title} | Blog | Aminul Islam Bhuiyan Amin`
            : 'Blog Post | Aminul Islam Bhuiyan Amin'}
        </title>
        <meta
          name="description"
          content={post?.summary || 'Read this blog post by Aminul Islam Bhuiyan Amin.'}
        />
        <meta
          property="og:title"
          content={
            post?.title
              ? `${post.title} | Blog | Aminul Islam Bhuiyan Amin`
              : 'Blog Post | Aminul Islam Bhuiyan Amin'
          }
        />
        <meta
          property="og:description"
          content={post?.summary || 'Read this blog post by Aminul Islam Bhuiyan Amin.'}
        />
        <meta property="og:image" content={'https://aminul01-g.github.io/logo512.png'} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://aminul01-g.github.io/blog/${post?.slug || ''}`} />
        <link rel="canonical" href={`https://aminul01-g.github.io/blog/${post?.slug || ''}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post?.title || 'Blog Post',
            description: post?.summary || 'Read this blog post by Aminul Islam Bhuiyan Amin.',
            datePublished: post?.date || '',
            author: {
              '@type': 'Person',
              name: 'Aminul Islam Bhuiyan Amin',
              url: 'https://aminul01-g.github.io',
            },
            publisher: {
              '@type': 'Person',
              name: 'Aminul Islam Bhuiyan Amin',
            },
            url: `https://aminul01-g.github.io/blog/${post?.slug || ''}`,
            image: 'https://aminul01-g.github.io/logo512.png',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://aminul01-g.github.io/blog/${post?.slug || ''}`,
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://aminul01-g.github.io/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://aminul01-g.github.io/blog',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post?.title || 'Blog Post',
                item: `https://aminul01-g.github.io/blog/${post?.slug || ''}`,
              },
            ],
          })}
        </script>
      </Helmet>
      {/* Blog post content */}
      <article className="prose dark:prose-invert max-w-3xl mx-auto my-8">
        <h1>{post.title}</h1>
        <p className="text-gray-500 text-sm mb-2">{post.date}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {(post.tags || []).map((tag) => (
            <span
              key={tag}
              className="bg-primary/10 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 text-xs px-2 py-1 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
        {post.body ? (
          <BlockContent blocks={post.body} projectId={'YOUR_PROJECT_ID'} dataset={'production'} />
        ) : (
          <p className="text-gray-600 dark:text-gray-400">
            Post content not available. The content may be coming soon or is currently unavailable.
          </p>
        )}
      </article>
      <SocialShare
        url={`https://aminul01-g.github.io/blog/${post.slug}`}
        title={post.title}
        className="mb-8"
      />
      {/* Comments section */}
      <Comments />
      <FeedbackWidget className="my-8" />
    </>
  );
}
