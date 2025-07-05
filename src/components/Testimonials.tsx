import React from 'react';

const testimonials = [
  {
    name: 'Jane Doe',
    title: 'Lead Engineer, TechCorp',
    quote: 'Aminul is a rare talent. His work on our AI project was innovative, reliable, and always delivered on time.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'John Smith',
    title: 'CTO, InnovateX',
    quote: 'His attention to detail and passion for learning are unmatched. Highly recommended for any tech team.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Sara Lee',
    title: 'AI Researcher, OpenAI',
    quote: 'Aminul brings creativity and deep technical skill to every project. A pleasure to collaborate with.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
];

export default function Testimonials() {
  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">Testimonials</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <figure key={i} className="glass-card rounded-2xl p-6 shadow-lg border border-primary/10 dark:border-gray-700 backdrop-blur-md flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
            <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full mb-4 border-2 border-primary shadow" />
            <blockquote className="text-lg text-gray-700 dark:text-gray-200 mb-3">“{t.quote}”</blockquote>
            <figcaption className="text-primary dark:text-indigo-300 font-semibold">{t.name}</figcaption>
            <span className="text-xs text-gray-500 dark:text-gray-400">{t.title}</span>
          </figure>
        ))}
      </div>
    </section>
  );
}
