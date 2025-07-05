import React from 'react';

const timeline = [
  {
    year: '2025',
    title: 'AI Research Intern',
    org: 'OpenAI',
    desc: 'Worked on LLM fine-tuning and prompt engineering for domain-specific applications.'
  },
  {
    year: '2024',
    title: 'Software Engineer',
    org: 'TechCorp',
    desc: 'Built scalable web apps and contributed to ML infrastructure.'
  },
  {
    year: '2023',
    title: 'B.Sc. in Computer Science',
    org: 'BUBT',
    desc: 'Graduated with distinction, focusing on deep learning and NLP.'
  },
  {
    year: '2022',
    title: 'Open Source Contributor',
    org: 'Hugging Face',
    desc: 'Contributed to Transformers and datasets for Bengali NLP.'
  },
];

export default function Timeline() {
  return (
    <section className="max-w-3xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">Timeline</h2>
      <ol className="relative border-l-4 border-primary/20 dark:border-indigo-900/40">
        {timeline.map((item, i) => (
          <li key={i} className="mb-10 ml-6">
            <span className="absolute -left-3 flex items-center justify-center w-6 h-6 bg-primary rounded-full ring-8 ring-white dark:ring-gray-900 text-white font-bold">{item.year.slice(2)}</span>
            <div className="glass-card bg-white/80 dark:bg-gray-900/80 border border-primary/10 dark:border-gray-700 rounded-xl shadow-lg p-6 mb-2">
              <h3 className="text-lg font-semibold text-primary dark:text-indigo-300">{item.title}</h3>
              <span className="block text-sm text-gray-500 dark:text-gray-400 mb-1">{item.org}</span>
              <p className="text-gray-700 dark:text-gray-200">{item.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
