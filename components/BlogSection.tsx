import Link from 'next/link';

// The component receives `allPostsData` as a prop.
const BlogSection = ({ allPostsData }) => (
    <section className="py-16 sm:py-24 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-white text-center mb-12">Writings & Notes</h2>
        <div className="space-y-8">
            {/* We map over the `allPostsData` array passed in as a prop */}
            {allPostsData.map(({ slug, date, title, description }) => (
                <Link key={slug} href={`/blog/${slug}`} className="block p-6 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-800 transition-colors">
                    <h3 className="text-2xl font-bold text-sky-400 mb-2">{title}</h3>
                    <p className="text-sm text-slate-400 mb-3">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p className="text-slate-300">{description}</p>
                </Link>
            ))}
        </div>
    </section>
);

export default BlogSection;