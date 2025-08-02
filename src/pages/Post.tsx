import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Comments from '../components/Comments';
import { BlogPost, blogPosts } from '../data/blog';
// import BlockContent from '@sanity/block-content-to-react'; // Removed Sanity dependency
import SocialShare from '../components/SocialShare';
import FeedbackWidget from '../components/FeedbackWidget';
import BlogPostSkeleton from '../components/BlogPostSkeleton';
import { ContentRecommendations } from '../components/ContentRecommendations';
import { AutoSummaries } from '../components/AutoSummaries';

export default function Post(): React.ReactElement {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
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

  // Ensure tags is always an array
  const postTags = post.tags || [];
  const postSlug = post.slug || '';

  return (
    <>
      <Helmet>
        <title>{post.title} | Blog | Aminul Islam Bhuiyan Amin</title>
        <meta
          name="description"
          content={
            post.summary || `Read this blog post by Aminul Islam Bhuiyan Amin about ${post.title}`
          }
        />
        <meta property="og:title" content={`${post.title} | Blog | Aminul Islam Bhuiyan Amin`} />
        <meta
          property="og:description"
          content={
            post.summary || `Read this blog post by Aminul Islam Bhuiyan Amin about ${post.title}`
          }
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://aminul01-g.github.io/blog/${postSlug}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:description"
          content={
            post.summary || `Read this blog post by Aminul Islam Bhuiyan Amin about ${post.title}`
          }
        />
        <link rel="canonical" href={`https://aminul01-g.github.io/blog/${postSlug}`} />
      </Helmet>

      <div className="max-w-6xl mx-auto my-12 px-4 space-y-12">
        {/* Main Blog Post Content */}
        <article className="prose dark:prose-invert max-w-3xl mx-auto bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border border-primary/10 dark:border-gray-700 p-8">
          <h1 className="mb-2">{post.title}</h1>

          {/* Post Metadata */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 text-sm text-gray-500">
            <span>Published on {post.date || 'an unknown date'}</span>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              {postTags.map((tag: string, index: number) => (
                <span
                  key={`${tag}-${index}`}
                  className="bg-primary/10 dark:bg-indigo-900/30 text-primary dark:text-indigo-300 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Post Content */}
          <div className="prose dark:prose-invert max-w-none">
            {post.body ? (
              <div className="text-gray-600 dark:text-gray-400">
                {/* Content would be rendered here if Sanity was configured */}
                <p>
                  Post content not available. The content may be coming soon or is currently
                  unavailable.
                </p>
              </div>
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                Post content not available. The content may be coming soon or is currently
                unavailable.
              </p>
            )}
          </div>

          {/* Social Sharing */}
          <SocialShare
            url={`https://aminul01-g.github.io/blog/${postSlug}`}
            title={post.title}
            className="my-8"
          />

          <FeedbackWidget className="my-8" />
        </article>

        {/* AI-Generated Summary */}
        <section className="max-w-4xl mx-auto">
          <AutoSummaries
            content={`${post.summary || post.title} This blog post explores important concepts and insights in technology and development.`}
            title={post.title}
            contentType="blog"
            tags={postTags}
            className="mb-12"
          />
        </section>

        {/* Content Recommendations */}
        <section className="max-w-6xl mx-auto">
          <ContentRecommendations
            currentItemId={postSlug}
            currentItemType="blog"
            currentTags={postTags}
            maxRecommendations={4}
            className="mb-12"
          />
        </section>

        {/* Comments Section */}
        <section className="max-w-3xl mx-auto">
          <Comments />
        </section>
      </div>
    </>
  );
}
