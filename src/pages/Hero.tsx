import { motion, useScroll, useTransform } from 'framer-motion';
import { profile } from '../data/profile';
import Typewriter from '../components/Typewriter';
import ImageWithFallback from '../components/ImageWithFallback';
import ParticleBackground from '../components/ParticleBackground';
import useScrollAnimation from '../hooks/useScrollAnimation';
import ParallaxSection from '../components/ParallaxSection';
import Button from '../components/Button';

const socialLinks = [
  {
    href: profile.github,
    label: 'GitHub',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
      </svg>
    ),
  },
  {
    href: profile.linkedin,
    label: 'LinkedIn',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
      </svg>
    ),
  },
  {
    href: profile.leetcode,
    label: 'LeetCode',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8.7 14.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L5.42 12l3.28 2.3zm6.6 0 3.28-2.3-3.28-2.3a1 1 0 1 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.4-1.4z" />
      </svg>
    ),
  },
  {
    href: profile.behance,
    label: 'Behance',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22 9.5h-6v1.5h6v-1.5zm-9.438 2.599c.535-.391.854-1.01.854-1.808 0-1.854-1.297-2.291-2.747-2.291h-6.669v9.5h6.826c1.635 0 3.174-.931 3.174-2.871 0-1.168-.519-1.9-1.438-2.53zm-5.562-2.099h2.588c.647 0 1.362.237 1.362 1.018 0 .708-.472 1.082-1.13 1.082h-2.82v-2.1zm2.97 6.5h-2.97v-2.4h2.949c.751 0 1.276.333 1.276 1.154 0 .82-.611 1.246-1.255 1.246zm11.03-2.5c-.088-.709-.35-1.27-.78-1.669-.456-.42-1.073-.631-1.836-.631-1.06 0-1.877.364-2.434 1.08-.466.605-.726 1.432-.726 2.365 0 .898.286 1.646.848 2.225.562.578 1.298.867 2.19.867 1.29 0 2.29-.591 2.702-1.57h-1.626c-.246.335-.612.5-1.096.5-.43 0-.781-.137-1.05-.408-.27-.271-.429-.648-.475-1.119h4.287c.031-.222.045-.438.05-.64.001-.08.002-.159.002-.237 0-.085-.001-.17-.004-.253-.006-.17-.016-.34-.035-.51z" />
      </svg>
    ),
  },
  {
    href: profile.telegram,
    label: 'Telegram',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M9.036 16.572l-.398 5.607c.57 0 .818-.244 1.116-.537l2.675-2.558 5.547 4.053c1.016.561 1.74.266 1.993-.941l3.617-16.964c.369-1.627-.591-2.264-1.627-1.872l-21.1 8.122c-1.617.627-1.6 1.527-.277 1.927l5.396 1.687 12.522-7.89c.59-.377 1.127-.168.686.209z" />
      </svg>
    ),
  },
];

export default function Hero(): React.ReactElement {
  const { elementRef } = useScrollAnimation();
  const { scrollYProgress } = useScroll();

  // Enhanced parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const orb1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: () => ({
      opacity: 1,
      y: 0,
    }),
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Gradient Mesh */}
      <motion.div
        className="absolute inset-0 gradient-mesh opacity-20"
        style={{ y: backgroundY }}
      />

      {/* Floating Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"
        style={{ y: orb1Y }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
        style={{ y: orb2Y }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Particle Background */}
      <ParticleBackground />

      {/* Main Content */}
      <ParallaxSection className="relative z-10 w-full">
        <motion.div
          ref={elementRef as React.RefObject<HTMLDivElement>}
          className="max-w-6xl mx-auto px-4 text-center"
          style={{ y: contentY }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Enhanced Profile Image */}
          <motion.div className="mb-8 relative" variants={itemVariants}>
            <div className="relative inline-block">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-glass relative z-10">
                <ImageWithFallback
                  src="/images/optimized/profile_pic.webp"
                  alt={profile.name}
                  className="w-full h-full object-cover object-center"
                  fallbackSrc="/images/optimized/profile_pic.webp"
                />
              </div>
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-primary/30"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </div>
          </motion.div>

          {/* Enhanced Name with Gradient Text */}
          <motion.h1
            className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold mb-6"
            variants={containerVariants}
          >
            {profile.name.split(' ').map((word, index) => (
              <motion.span
                key={index}
                custom={index}
                variants={wordVariants}
                className="inline-block mr-4 text-gradient"
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* Enhanced Typewriter */}
          <motion.div variants={itemVariants} className="mb-8">
            <Typewriter
              words={[profile.title, profile.slogan]}
              className="text-2xl sm:text-3xl lg:text-4xl mb-4 font-semibold text-gray-700 dark:text-gray-200"
              speed={70}
              pause={1200}
            />
          </motion.div>

          {/* Enhanced Description */}
          <motion.p
            className="text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto text-lg sm:text-xl leading-relaxed"
            variants={itemVariants}
          >
            AI Engineering Student passionate about building intelligent systems that shape the
            future. Let&apos;s connect and create something extraordinary together!
          </motion.p>

          {/* Enhanced Social Icons */}
          <motion.div className="flex justify-center gap-4 mb-12" variants={containerVariants}>
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="glass-card p-4 rounded-2xl text-gray-600 dark:text-gray-300 hover:text-primary transition-all duration-300 hover:shadow-glow group"
                variants={itemVariants}
                custom={index}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="group-hover:animate-pulse"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {link.icon}
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          {/* Enhanced Call-to-Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            {profile.resume && (
              <Button
                variant="primary"
                size="lg"
                glow
                icon={
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                }
                onClick={() => window.open(profile.resume, '_blank')}
              >
                Download Resume
              </Button>
            )}

            <Button
              variant="glass"
              size="lg"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              }
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Let&apos;s Talk
            </Button>
          </motion.div>
        </motion.div>
      </ParallaxSection>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          className="glass-card p-3 rounded-full cursor-pointer hover:shadow-glow transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
          }}
        >
          <motion.svg
            className="w-6 h-6 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
