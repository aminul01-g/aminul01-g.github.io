import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ReadingProgressBarProps {
  className?: string;
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to width percentage
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  // Show progress bar when user starts scrolling
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className={`fixed top-0 left-0 w-full h-1 z-50 ${className}`}
      initial={{ opacity: 0, y: -10 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background track */}
      <div className="w-full h-full bg-white/10 backdrop-blur-sm" />
      
      {/* Progress bar */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-indigo-500 rounded-r-full"
        style={{ width }}
      />
      
      {/* Glow effect */}
      <motion.div
        className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary/50 to-indigo-500/50 rounded-r-full blur-sm"
        style={{ width }}
      />
    </motion.div>
  );
};

export default ReadingProgressBar; 