import React from 'react';
import { FiExternalLink } from 'react-icons/fi';
import ImageWithFallback from './ImageWithFallback';

const achievements = [
  {
    title: 'LeetCode Problem Solver',
    description: 'Ranked among globally in LeetCode contests.',
    icon: '🏆',
    link: 'https://leetcode.com/u/aminul01-lc/',
    linkText: 'View LeetCode Profile',
    image: '/images/certificates/leetcode.png',
  },
  {
    title: 'AI Research Publication',
    description: 'Preparing a paper on A Comparative Study of Machine Learning and Deep Learning Models for Sentiment Analysis of Bengali Text',
    icon: '📄',
  },
  {
    title: 'Open Source Contributor',
    description: 'Contributed to Hugging Face Transformers and LangChain.',
    icon: '🌐',
  },
  {
    title: 'Hackathon Excellence',
    description: 'Successfully participated in the "Hacktasyne" 10-Hour Hackathon at Tech Fusion Fest 2025, organized by the BASIS Students\' Forum of BUBT Chapter Club. Recognized for enthusiasm, teamwork, and innovative problem-solving.',
    icon: '🥇',
    link: 'https://github.com/aminul01-g/krishi-bondhu.git',
    linkText: 'View Krishi-bondhu Project Repo',
    image: '/images/certificates/hackathon.jpeg',
  },
];

export default function Achievements(): React.ReactElement {
  return (
    <section id="achievements" className="max-w-5xl mx-auto my-16 px-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
        Achievements
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {achievements.map((a, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-6 flex flex-col items-start gap-4 shadow-lg border border-primary/10 dark:border-gray-700 backdrop-blur-md"
          >
            <div className="flex items-start gap-4 w-full">
              <span className="text-4xl">{a.icon}</span>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-1 text-primary dark:text-indigo-300">
                  {a.title}
                </h3>
                <p className="text-[var(--theme-text-primary)] mb-3">{a.description}</p>
                {a.link && (
                  <a 
                    href={a.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary dark:text-indigo-400 hover:text-indigo-500 mb-2 hover:underline text-sm font-medium flex items-center gap-1 w-fit"
                  >
                    {a.linkText || 'View Details'} <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            {a.image && (
              <div className="mt-2 w-full rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                <ImageWithFallback 
                  src={a.image} 
                  alt={`${a.title} Certificate`} 
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" 
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
