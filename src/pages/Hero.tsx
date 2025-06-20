import { motion } from 'framer-motion';
import { profile } from '../data/profile';
import Typewriter from '../components/Typewriter';

export default function Hero() {
  return (
    <section id="hero" className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-4 py-20 fade-in">
      <div className="hero-bg" />
      <motion.img
        src={profile.profilePic}
        alt="profile"
        className="w-36 h-36 rounded-full mb-6 border-4 border-primary shadow-lg relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      />
      <motion.h1
        className="text-4xl sm:text-6xl font-bold mb-4 dark:text-white relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Hi, I'm {profile.name}
      </motion.h1>
      <Typewriter
        words={[profile.title, profile.slogan]}
        className="text-primary text-xl sm:text-2xl mb-6 font-semibold relative z-10"
        speed={70}
        pause={1200}
      />
      <motion.a
        href={profile.resume}
        target="_blank"
        rel="noopener noreferrer"
        className="btn relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        tabIndex={0}
      >
        View Resume
      </motion.a>
    </section>
  );
}
