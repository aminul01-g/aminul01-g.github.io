import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.section
      className="p-8 text-center"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold mb-4">Hi, I'm Aminul</h1>
      <p className="text-lg">AI Engineer | ML Enthusiast | Python Developer</p>
      <p className="mt-4">I design and build intelligent systems that learn and adapt.</p>
    </motion.section>
  );
}
