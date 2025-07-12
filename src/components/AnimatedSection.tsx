import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children, className }) => {
  return (
    <motion.section
      className={`relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 py-16 fade-in max-w-6xl mx-auto bg-white/80 dark:bg-gray-900/80 rounded-3xl shadow-2xl border border-primary/10 dark:border-gray-700 backdrop-blur-xl animate-fadeInUp transition-all duration-300 mb-12 ${className}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;
