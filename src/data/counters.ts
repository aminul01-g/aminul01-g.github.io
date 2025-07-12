import { CounterItem } from '../components/AnimatedCounters';
import React from 'react';

export const countersData: CounterItem[] = [
  {
    id: 'projects',
    label: 'Projects Completed',
    value: 25,
    suffix: '+',
    icon: React.createElement('svg', { className: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' })
    ),
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'code',
    label: 'Lines of Code',
    value: 50000,
    suffix: '+',
    icon: React.createElement('svg', { className: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4' })
    ),
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'hours',
    label: 'Hours Coded',
    value: 2000,
    suffix: '+',
    icon: React.createElement('svg', { className: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' })
    ),
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'algorithms',
    label: 'Algorithms Solved',
    value: 150,
    suffix: '+',
    icon: React.createElement('svg', { className: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' })
    ),
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'models',
    label: 'ML Models Built',
    value: 12,
    suffix: '+',
    icon: React.createElement('svg', { className: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
    ),
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'languages',
    label: 'Programming Languages',
    value: 8,
    suffix: '+',
    icon: React.createElement('svg', { className: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' })
    ),
    color: 'from-teal-500 to-green-500'
  },
  {
    id: 'frameworks',
    label: 'Frameworks Mastered',
    value: 15,
    suffix: '+',
    icon: React.createElement('svg', { className: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' })
    ),
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'certifications',
    label: 'Certifications Earned',
    value: 6,
    suffix: '+',
    icon: React.createElement('svg', { className: 'w-8 h-8', fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' },
      React.createElement('path', { strokeLinecap: 'round', strokeLinejoin: 'round', strokeWidth: '2', d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' })
    ),
    color: 'from-yellow-500 to-orange-500'
  }
]; 