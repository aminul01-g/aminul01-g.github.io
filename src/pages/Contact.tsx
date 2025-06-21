import { profile } from '../data/profile';
import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="p-8 max-w-xl mx-auto bg-white dark:bg-gray-900 transition-colors duration-300 rounded-lg shadow mb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Contact Me</h2>
      <p className="text-gray-700 dark:text-gray-200">Email: <a href="mailto:aminulamin0001@gmail.com" className="text-blue-500 dark:text-blue-300">aminulamin0001@gmail.com</a></p>
      <p className="text-gray-700 dark:text-gray-200">GitHub: <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300">{profile.github.replace('https://', '')}</a></p>
      <p className="text-gray-700 dark:text-gray-200">LinkedIn: <a href="https://linkedin.com/in/aminulai" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300">linkedin.com/in/aminulai</a></p>
    </motion.section>
  );
}
