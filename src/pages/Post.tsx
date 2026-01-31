import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Comments from '../components/Comments';
import { BlogPost, blogPosts, PortableTextBlock, PortableTextSpan } from '../data/blog';
import { calculateReadingTime } from '../utils/readingTime';
// import BlockContent from '@sanity/block-content-to-react'; // Removed Sanity dependency
import SocialShare from '../components/SocialShare';
import FeedbackWidget from '../components/FeedbackWidget';
import BlogPostSkeleton from '../components/BlogPostSkeleton';
import { ContentRecommendations } from '../components/ContentRecommendations';
import { AutoSummaries } from '../components/AutoSummaries';
import MarkdownRenderer from '../components/MarkdownRenderer';

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

  // Generate TOC
  const slugify = (text: string) =>
    text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

  const headings =
    post.body?.filter((block) => block.style === 'h2' || block.style === 'h3').map((block) => ({
      text: block.children?.map((c) => c.text).join('') || '',
      id: slugify(block.children?.map((c) => c.text).join('') || ''),
      level: block.style,
    })) || [];

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

      <div className="max-w-7xl mx-auto my-12 px-4 lg:grid lg:grid-cols-[1fr_300px] gap-12 items-start">
        {/* Main Content Column */}
        <div className="space-y-12 min-w-0">
          <article className="prose dark:prose-invert max-w-none bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border border-primary/10 dark:border-gray-700 p-8">
            <h1 className="mb-2">{post.title}</h1>

            {/* Post Metadata */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <span>Published on {post.date || 'an unknown date'}</span>
                <span>•</span>
                <span className="font-medium text-primary">{calculateReadingTime(post.body)}</span>
              </div>
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
              {post.markdownBody ? (
                  <MarkdownRenderer content={post.markdownBody} />
              ) : post.body && post.body.length > 0 ? (
                <div className="text-gray-800 dark:text-gray-200">
                  {post.body.map((block: PortableTextBlock, index: number) => {
                    const key = block._key || `block-${index}`;

                    // Helper to render children
                    const renderChildren = () => (
                      <>
                        {block.children?.map((child: PortableTextSpan, childIndex: number) => (
                          // Handle newlines in text for simple bullet points behavior
                          child.text.split('\n').map((line: string, lineIndex: number) => (
                            <React.Fragment key={`${key}-child-${childIndex}-line-${lineIndex}`}>
                              {lineIndex > 0 && <br />}
                              {line}
                            </React.Fragment>
                          ))
                        ))}
                      </>
                    );

                    const text = block.children?.map((c: PortableTextSpan) => c.text).join('') || '';
                    const id = slugify(text);

                    switch (block.style) {
                      case 'h1':
                        return <h1 key={key}>{renderChildren()}</h1>;
                      case 'h2':
                        return (
                          <h2 key={key} id={id} className="text-2xl font-bold mt-8 mb-4 scroll-mt-24 group">
                            <a href={`#${id}`} className="no-underline hover:underline decoration-primary">
                              {renderChildren()}
                              <span className="opacity-0 group-hover:opacity-100 ml-2 text-primary transition-opacity">
                                #
                              </span>
                            </a>
                          </h2>
                        );
                      case 'h3':
                        return (
                          <h3 key={key} id={id} className="text-xl font-semibold mt-6 mb-3 scroll-mt-24 group">
                            <a href={`#${id}`} className="no-underline hover:underline decoration-primary">
                              {renderChildren()}
                              <span className="opacity-0 group-hover:opacity-100 ml-2 text-primary transition-opacity text-sm">
                                #
                              </span>
                            </a>
                          </h3>
                        );
                      case 'blockquote':
                        return (
                          <blockquote key={key} className="border-l-4 border-primary pl-4 italic my-4">
                            {renderChildren()}
                          </blockquote>
                        );
                      case 'normal':
                      default: {
                        // Check if it looks like a list item (starts with •) for better styling
                        const isList = block.children?.some((c: PortableTextSpan) => c.text.trim().startsWith('•'));
                        if (isList) {
                          return (
                            <div key={key} className="my-4">
                              {renderChildren()}
                            </div>
                          );
                        }
                        return <p key={key} className="mb-4 leading-relaxed">{renderChildren()}</p>;
                      }
                    }
                  })}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  Post content not available. The content may be coming soon or is currently unavailable.
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

        {/* Sidebar Column */}
        <aside className="hidden lg:block sticky top-24 self-start space-y-8">
          <div className="bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl border border-primary/10 dark:border-gray-700 p-6 backdrop-blur-md">
            <h4 className="font-bold text-lg mb-4 text-primary border-b border-primary/10 pb-2">
              Table of Contents
            </h4>
            {headings.length === 0 ? (
              <p className="text-sm text-gray-500">No headings available.</p>
            ) : (
              <nav className="flex flex-col space-y-3">
                {headings.map((heading, idx) => (
                  <a
                    key={idx}
                    href={`#${heading.id}`}
                    className={`text-sm text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors line-clamp-2 ${heading.level === 'h3' ? 'pl-4 border-l-2 border-primary/20' : ''
                      }`}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </aside>
      </div>
    </>
  );
}
