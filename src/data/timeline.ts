import { TimelineItem } from '../components/InteractiveTimeline';
import React from 'react';

export const timelineData: TimelineItem[] = [
  {
    id: '1',
    title: 'AI Engineering Student',
    subtitle: 'University of Information Technology and Sciences',
    description:
      'Currently pursuing my degree in AI Engineering, focusing on machine learning, deep learning, and artificial intelligence applications. Learning cutting-edge technologies and methodologies.',
    date: '2023 - Present',
    type: 'education',
    icon: React.createElement(
      'svg',
      { className: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
        d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
      })
    ),
    tags: ['AI', 'Machine Learning', 'Deep Learning', 'Python'],
  },
  {
    id: '2',
    title: 'Machine Learning Projects',
    subtitle: 'Personal & Academic Projects',
    description:
      'Developed multiple machine learning projects including predictive modeling, computer vision applications, and natural language processing systems. Implemented various algorithms and frameworks.',
    date: '2023 - Present',
    type: 'experience',
    icon: React.createElement(
      'svg',
      { className: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
        d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
      })
    ),
    tags: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV'],
  },
  {
    id: '3',
    title: 'Data Science Certification',
    subtitle: 'Coursera & Udemy',
    description:
      'Completed comprehensive data science and machine learning certifications, covering statistical analysis, data visualization, and predictive modeling techniques.',
    date: '2023',
    type: 'achievement',
    icon: React.createElement(
      'svg',
      { className: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
        d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
      })
    ),
    tags: ['Data Science', 'Statistics', 'Visualization', 'R'],
  },
  {
    id: '4',
    title: 'Web Development Skills',
    subtitle: 'Full-Stack Development',
    description:
      'Built modern web applications using React, TypeScript, and Node.js. Created responsive designs with Tailwind CSS and implemented RESTful APIs.',
    date: '2022 - Present',
    type: 'experience',
    icon: React.createElement(
      'svg',
      { className: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
        d: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      })
    ),
    tags: ['React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
  },
  {
    id: '5',
    title: 'Competitive Programming',
    subtitle: 'LeetCode & CodeForces',
    description:
      'Active participant in competitive programming contests, solving algorithmic problems and improving problem-solving skills. Achieved high rankings in various competitions.',
    date: '2022 - Present',
    type: 'achievement',
    icon: React.createElement(
      'svg',
      { className: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
        d: 'M13 10V3L4 14h7v7l9-11h-7z',
      })
    ),
    tags: ['Algorithms', 'Data Structures', 'C++', 'Python'],
  },
  {
    id: '6',
    title: 'Open Source Contributions',
    subtitle: 'GitHub Projects',
    description:
      'Contributed to various open-source projects and created personal projects that demonstrate technical skills and problem-solving abilities. Active in the developer community.',
    date: '2022 - Present',
    type: 'experience',
    icon: React.createElement(
      'svg',
      { className: 'w-6 h-6', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', {
        strokeLinecap: 'round',
        strokeLinejoin: 'round',
        strokeWidth: '2',
        d: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      })
    ),
    tags: ['GitHub', 'Open Source', 'Collaboration', 'Version Control'],
  },
];
