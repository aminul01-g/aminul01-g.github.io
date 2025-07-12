import { motion } from 'framer-motion';
import useScrollAnimation from '../hooks/useScrollAnimation';

export interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  type: 'education' | 'experience' | 'achievement';
  icon: React.ReactNode;
  tags?: string[];
}

interface InteractiveTimelineProps {
  items: TimelineItem[];
  title?: string;
  subtitle?: string;
}

const InteractiveTimeline: React.FC<InteractiveTimelineProps> = ({
  items,
  title = "My Journey",
  subtitle = "A timeline of my education, experience, and achievements"
}) => {
  const { elementRef } = useScrollAnimation<HTMLDivElement>();

  const getTypeColor = (type: TimelineItem['type']) => {
    switch (type) {
      case 'education':
        return 'from-blue-500 to-cyan-500';
      case 'experience':
        return 'from-purple-500 to-pink-500';
      case 'achievement':
        return 'from-green-500 to-emerald-500';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'education':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        );
      case 'experience':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h4a2 2 0 012 2z" />
          </svg>
        );
      case 'achievement':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        );
      default:
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
    }
  };

  return (
    <section className="py-16 px-4 mt-32 relative z-10" ref={elementRef}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-primary">
            {title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/50 to-indigo-500/50" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Content Card */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <motion.div
                    className="glass-card p-6 rounded-2xl relative group"
                    whileHover={{ scale: 1.02, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Type Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`p-2 rounded-full bg-gradient-to-r ${getTypeColor(item.type)} text-white`}>
                        {getTypeIcon(item.type)}
                      </div>
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                        {item.type}
                      </span>
                    </div>

                    {/* Date */}
                    <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mb-2">
                      {item.date}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-glass dark:text-white mb-2">
                      {item.title}
                    </h3>

                    {/* Subtitle */}
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-3">
                      {item.subtitle}
                    </p>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-white/30 dark:bg-white/10 text-glass dark:text-white border border-black/10 dark:border-white/20"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Custom Icon */}
                    <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                      {item.icon}
                    </div>
                  </motion.div>
                </div>

                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-primary to-indigo-500 rounded-full border-4 border-white dark:border-gray-800 shadow-lg z-10" />

                {/* Spacer */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveTimeline; 