import { profile } from '../data/profile';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.section
      id="about"
      className="max-w-3xl mx-auto p-8 bg-white dark:bg-gray-900 rounded-lg shadow transition-colors duration-300 mb-16"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-3xl font-bold mb-4 dark:text-white">About Me</h2>
      <img src={profile.profilePic} alt="Profile" className="w-32 h-32 rounded-full mb-4 border-4 border-primary mx-auto" />
      <p className="text-lg mb-4 text-gray-700 dark:text-gray-200">{profile.bio}</p>
      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-300 underline">GitHub Profile</a>
    </motion.section>
  );
}
