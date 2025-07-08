import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '../data/blog';
import Comments from '../components/Comments';

export default function Post({ post }: { post: BlogPost }) {
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
        <div dangerouslySetInnerHTML={{ __html: post.content ? post.content : '' }} />
      </article>
      {/* Comments section */}
      <Comments postSlug={post.slug} />
    </>
  );
}
