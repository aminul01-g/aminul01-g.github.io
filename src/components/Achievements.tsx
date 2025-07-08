import React from 'react';

const achievements = [
  {
    title: 'Top 1% on LeetCode',
    description: 'Ranked among the top 1% globally in LeetCode contests.',
    icon: '🏆',
  },
  {
    title: 'AI Research Publication',
    description: 'Published a paper on NLP in an international journal.',
    icon: '📄',
  },
  {
    title: 'Open Source Contributor',
    description: 'Contributed to Hugging Face Transformers and LangChain.',
    icon: '🌐',
  },
  {
    title: 'Hackathon Winner',
    description: 'Won 1st place in the BUBT AI Hackathon 2024.',
    icon: '🥇',
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="max-w-5xl mx-auto my-16 px-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
        Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {achievements.map((a, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-6 flex items-start gap-4 shadow-lg border border-primary/10 dark:border-gray-700 backdrop-blur-md"
          >
            <span className="text-4xl">{a.icon}</span>
            <div>
              <h3 className="text-xl font-semibold mb-1 text-primary dark:text-indigo-300">
                {a.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-200">{a.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
