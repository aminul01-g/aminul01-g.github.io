import ImageWithFallback from './ImageWithFallback';

const testimonials = [
  {
    name: 'Jane Doe',
    title: 'Lead Engineer, TechCorp',
    quote:
      'Aminul is a rare talent. His work on our AI project was innovative, reliable, and always delivered on time.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'John Smith',
    title: 'CTO, InnovateX',
    quote:
      'His attention to detail and passion for learning are unmatched. Highly recommended for any tech team.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Sara Lee',
    title: 'AI Researcher, OpenAI',
    quote:
      'Aminul brings creativity and deep technical skill to every project. A pleasure to collaborate with.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

export default function Testimonials(): React.ReactElement {
  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
        Testimonials
      </h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure
            key={i}
            className="glass-card rounded-2xl p-6 shadow-lg border border-primary/10 dark:border-gray-700 backdrop-blur-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-2xl hover:scale-[1.05] hover:border-primary/40 hover:ring-2 hover:ring-primary/30 bg-white/70 dark:bg-gray-900/70 relative overflow-hidden group"
          >
            <div className="rounded-full shadow-2xl border-2 border-primary ring-2 ring-primary/20 bg-white dark:bg-gray-800 overflow-hidden flex items-center justify-center mx-auto w-16 h-16 mb-4">
              <ImageWithFallback
                src={t.avatar}
                alt={t.name}
                className="w-full h-full object-cover mx-auto"
                loading="lazy"
              />
            </div>
            <blockquote className="text-lg text-gray-700 dark:text-gray-200 mb-3">
              “{t.quote}”
            </blockquote>
            <figcaption className="text-primary dark:text-indigo-300 font-semibold">
              {t.name}
            </figcaption>
            <span className="text-xs text-gray-500 dark:text-gray-400">{t.title}</span>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-indigo-400/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0" />
          </figure>
        ))}
      </div>
    </section>
  );
}
