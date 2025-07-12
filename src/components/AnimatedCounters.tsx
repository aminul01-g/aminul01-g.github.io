import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export interface CounterItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  icon: React.ReactNode;
  color: string;
}

interface AnimatedCountersProps {
  counters: CounterItem[];
  title?: string;
  subtitle?: string;
}

const AnimatedCounters: React.FC<AnimatedCountersProps> = ({
  counters,
  title = 'My Achievements',
  subtitle = 'Numbers that tell my story',
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (isInView) {
      counters.forEach((counter) => {
        animateCounter(counter.id, counter.value);
      });
    }
  }, [isInView, counters]);

  const animateCounter = (id: string, targetValue: number) => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    let currentValue = 0;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      setCounts((prev) => ({ ...prev, [id]: Math.floor(currentValue) }));
    }, duration / steps);
  };

  return (
    <section className="py-16 px-4 relative z-20" ref={ref}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-indigo-400 bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </motion.div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((counter, index) => (
            <motion.div
              key={counter.id}
              className="glass-card p-6 rounded-2xl text-center relative group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              {/* Background Glow */}
              <div
                className={`absolute inset-0 rounded-2xl ${counter.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Icon */}
              <div
                className={`w-16 h-16 mx-auto mb-4 p-3 rounded-full bg-gradient-to-r ${counter.color} text-white flex items-center justify-center`}
              >
                {counter.icon}
              </div>

              {/* Counter Value */}
              <motion.div
                className="text-4xl sm:text-5xl font-bold text-glass dark:text-white mb-2"
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                viewport={{ once: true }}
              >
                {counter.prefix || ''}
                {counts[counter.id] || 0}
                {counter.suffix || ''}
              </motion.div>

              {/* Label */}
              <p className="text-gray-600 dark:text-gray-400 font-medium">{counter.label}</p>

              {/* Animated Border */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-indigo-500 rounded-b-2xl"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1, delay: index * 0.1 + 1 }}
                viewport={{ once: true }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Stats Row */}
        <motion.div
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-primary mb-2">99%</div>
            <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-primary mb-2">24/7</div>
            <div className="text-gray-600 dark:text-gray-400">Support Available</div>
          </div>
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-2xl font-bold text-primary mb-2">100%</div>
            <div className="text-gray-600 dark:text-gray-400">Project Success Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedCounters;
