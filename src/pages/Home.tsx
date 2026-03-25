import React, { Suspense, lazy } from 'react';
import Hero from './Hero';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blog';
import { calculateReadingTime } from '../utils/readingTime';
import ProjectCard from '../components/ProjectCard';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { motion } from 'framer-motion';
import ImageWithFallback from '../components/ImageWithFallback';
import BlogCardTiltWrapper from '../components/BlogCardTiltWrapper';
import useScrollTrigger from '../hooks/useScrollTrigger';
import { Helmet } from 'react-helmet-async';
import { usePageTracking } from '../hooks/useAnalytics';
import TestimonialsCarousel from '../components/TestimonialsCarousel';
import { FaRobot, FaCode, FaChartBar, FaTools } from 'react-icons/fa';
import {
  SiTensorflow, SiPytorch, SiScikitlearn, SiPython, SiTypescript, SiC, SiCplusplus,
  SiPandas, SiNumpy, SiDocker, SiGit, SiAmazonaws, SiLinux
} from 'react-icons/si';
import { timelineData } from '../data/timeline';
import InteractiveTimeline from '../components/InteractiveTimeline';

// Remove Testimonials lazy import
const Achievements = lazy(() => import('../components/Achievements'));
const Contact = lazy(() => import('./Contact'));

const aboutSummary = `🎓 I'm an AI-driven Computer Science student at BUBT, deeply passionate about building intelligent systems. My main interests lie in Deep Learning, NLP, and LLMs — with hands-on experience using PyTorch, TensorFlow, and Hugging Face.

🔬 Currently exploring prompt engineering, multimodal AI, and LangChain-based applications.`;

// Animation variants for consistent animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const skillsData = [
  {
    title: 'AI/ML',
    icon: <FaRobot className="w-6 h-6" />,
    skills: [
      { name: 'TensorFlow', icon: <SiTensorflow className="text-orange-500" /> },
      { name: 'PyTorch', icon: <SiPytorch className="text-red-500" /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn className="text-blue-500" /> },
      { name: 'LangChain', icon: <span className="text-green-600 font-bold px-1">🦜</span> },
      { name: 'LangGraph', icon: <span className="text-blue-600 font-bold px-1">🕸️</span> },
      { name: 'CrewAI', icon: <span className="text-yellow-600 font-bold px-1">🚣</span> },
      { name: 'LLMs', icon: <span className="text-purple-500 font-bold px-1">🧠</span> },
      { name: 'Computer Vision', icon: <span className="text-indigo-500 font-bold px-1">👁️</span> }
    ],
  },
  {
    title: 'Programming',
    icon: <FaCode className="w-6 h-6" />,
    skills: [
      { name: 'Python', icon: <SiPython className="text-blue-500" /> },
      { name: 'TypeScript', icon: <SiTypescript className="text-blue-600" /> },
      { name: 'C', icon: <SiC className="text-blue-400" /> },
      { name: 'C++', icon: <SiCplusplus className="text-blue-500" /> },
      { name: 'Java', icon: <FaCode className="text-red-500" /> }
    ],
  },
  {
    title: 'Data Science',
    icon: <FaChartBar className="w-6 h-6" />,
    skills: [
      { name: 'Pandas', icon: <SiPandas className="text-blue-900 dark:text-blue-400" /> },
      { name: 'NumPy', icon: <SiNumpy className="text-blue-500" /> },
      { name: 'Data Analysis', icon: <FaChartBar className="text-green-500" /> },
      { name: 'Data Visualization', icon: <FaChartBar className="text-purple-500" /> }
    ],
  },
  {
    title: 'Tools & Platforms',
    icon: <FaTools className="w-6 h-6" />,
    skills: [
      { name: 'Docker', icon: <SiDocker className="text-blue-500" /> },
      { name: 'Git', icon: <SiGit className="text-orange-500" /> },
      { name: 'AWS', icon: <SiAmazonaws className="text-yellow-500" /> },
      { name: 'Linux', icon: <SiLinux className="text-gray-700 dark:text-gray-300" /> },
      { name: 'MLOps', icon: <FaTools className="text-gray-500" /> }
    ],
  },
];

export default function Home(): React.ReactElement {
  const aboutTrigger = useScrollTrigger({ threshold: 0.2 });
  const skillsTrigger = useScrollTrigger({ threshold: 0.15 });
  const projectsTrigger = useScrollTrigger({ threshold: 0.1 });
  const blogTrigger = useScrollTrigger({ threshold: 0.1 });

  // Track page view
  usePageTracking('/', 'Home');

  // Auto-download resume removed for better UX

  return (
    <>
      <Helmet>
        <title>Home | Aminul Islam Bhuiyan Amin</title>
        <meta
          name="description"
          content="Portfolio and blog of Md Aminul Islam Bhuiyan Amin, AI-driven Computer Science student at BUBT. Explore projects, skills, and insights on AI, ML, and software engineering."
        />
        <meta property="og:title" content="Home | Aminul Islam Bhuiyan Amin" />
        <meta
          property="og:description"
          content="Portfolio and blog of Md Aminul Islam Bhuiyan Amin, AI-driven Computer Science student at BUBT. Explore projects, skills, and insights on AI, ML, and software engineering."
        />
        <meta property="og:image" content="https://aminul01-g.github.io/logo512.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aminul01-g.github.io/" />
        <link rel="canonical" href="https://aminul01-g.github.io/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Aminul Islam Bhuiyan Amin',
            jobTitle: 'AI Engineer & Computer Science Student',
            description:
              'AI-driven Computer Science student at BUBT, deeply passionate about building intelligent systems.',
            url: 'https://aminul01-g.github.io',
            image: 'https://aminul01-g.github.io/logo512.png',
            sameAs: ['https://github.com/aminul01-g', 'https://linkedin.com/in/aminulai'],
            knowsAbout: [
              'Artificial Intelligence',
              'Machine Learning',
              'Deep Learning',
              'Natural Language Processing',
              'Python',
              'PyTorch',
              'TensorFlow',
              'Computer Vision',
            ],
            alumniOf: {
              '@type': 'CollegeOrUniversity',
              name: 'Bangladesh University of Business & Technology (BUBT)',
            },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Aminul Islam Bhuiyan Amin',
            url: 'https://aminul01-g.github.io/',
            logo: 'https://aminul01-g.github.io/logo512.png',
            sameAs: [
              'https://github.com/aminul01-g',
              'https://linkedin.com/in/aminulai',
              // Add more social profiles as needed
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://aminul01-g.github.io/',
              },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SiteNavigationElement',
            name: ['Home', 'About', 'Projects', 'Blog'],
            url: [
              'https://aminul01-g.github.io/',
              'https://aminul01-g.github.io/about',
              'https://aminul01-g.github.io/projects',
              'https://aminul01-g.github.io/blog',
            ],
          })}
        </script>
      </Helmet>
      <div className="relative z-10 w-full min-h-screen pb-24">
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <section className="bento-card">
          <div className="max-w-4xl mx-auto">
            <motion.div
              ref={aboutTrigger.ref}
              style={{
                opacity: aboutTrigger.opacity,
                y: aboutTrigger.y,
                scale: aboutTrigger.scale,
              }}
              className="text-center mb-12"
            >
              <div className="flex flex-col items-center gap-6 mb-8">
                <div className="GlassCard rounded-full shadow-2xl overflow-hidden flex items-center justify-center mx-auto w-20 h-20 transition-transform duration-500 hover:scale-105">
                  <ImageWithFallback
                    src="/images/optimized/profile_pic.webp"
                    alt="Profile"
                    className="w-full h-full object-cover mx-auto"
                    loading="lazy"
                  />
                  {/* Subtle glowing ring effect */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-indigo-500/10 dark:from-primary/20 dark:to-indigo-500/20 blur-sm pointer-events-none" />
                  {/* Enhanced border glow for better visibility */}
                  <div className="absolute inset-0 rounded-full border border-primary/30 dark:border-primary/50 pointer-events-none" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
                  About Me
                </h2>
              </div>
              <motion.p
                className="text-gray-700 dark:text-gray-200 mb-8 whitespace-pre-line text-lg leading-relaxed max-w-3xl mx-auto"
                style={{ opacity: aboutTrigger.opacity, y: aboutTrigger.y }}
              >
                {aboutSummary}
              </motion.p>
              <motion.div style={{ opacity: aboutTrigger.opacity, y: aboutTrigger.y }}>
                <Link to="/about" className="inline-flex items-center gap-2 group">
                  <Button className="inline-flex items-center gap-2 group">
                    Read More
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Achievements Section */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[10vh] text-lg">
              Loading Achievements...
            </div>
          }
        >
          <Achievements />
        </Suspense>

        {/* Skills Section */}
        <section className="bento-card">
          <div className="max-w-6xl mx-auto">
            <motion.div
              ref={skillsTrigger.ref}
              style={{
                opacity: skillsTrigger.opacity,
                y: skillsTrigger.y,
                scale: skillsTrigger.scale,
              }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
                Skills & Expertise
              </h2>
              <p className="text-gray-500 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Leveraging cutting-edge technologies to build innovative solutions
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skillsData.map((skill) => (
                <motion.div
                  key={skill.title}
                  variants={fadeInUp}
                  className="GlassCard rounded-2xl p-8 text-left relative overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-indigo-500 text-white text-2xl shadow-lg">
                      {skill.icon}
                    </span>
                    <span className="font-bold text-lg text-gray-900 dark:text-white">
                      {skill.title}
                    </span>
                  </div>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300 text-base">
                    {skill.skills.map((item) => (
                      <li key={item.name} className="flex items-center gap-3">
                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                        <span className="font-medium">{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section className="bento-card">
          <InteractiveTimeline
            items={timelineData}
            title="Experience & Education"
            subtitle="A brief journey of my academic and professional career"
          />
        </section>

        {/* Projects Section */}
        <section className="bento-card">
          <div className="max-w-6xl mx-auto">
            <motion.div
              ref={projectsTrigger.ref}
              style={{
                opacity: projectsTrigger.opacity,
                y: projectsTrigger.y,
                scale: projectsTrigger.scale,
              }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
                Featured Projects
              </h2>
              <p className="text-gray-500 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Showcasing my latest work and innovative solutions
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mb-12"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {projects
                .filter((p) => p.featured)
                .slice(0, 3)
                .map((project) => (
                  <motion.div
                    key={project.title}
                    variants={fadeInUp}
                    className="GlassCard rounded-2xl p-6 flex flex-col items-start transition-all duration-300 hover:scale-[1.02]"
                    data-testid="project-card"
                  >
                    <ProjectCard {...project} />
                  </motion.div>
                ))}
            </motion.div>

            <div className="text-center">
              <Link to="/projects">
                <Button className="inline-flex items-center gap-2">
                  See All Projects
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
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="bento-card">
          <div className="max-w-6xl mx-auto">
            <motion.div
              ref={blogTrigger.ref}
              style={{
                opacity: blogTrigger.opacity,
                y: blogTrigger.y,
                scale: blogTrigger.scale,
              }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-400 dark:from-primary dark:to-indigo-300">
                Recent Blog Posts
              </h2>
              <p className="text-gray-500 dark:text-gray-300 text-lg max-w-2xl mx-auto">
                Sharing insights and knowledge from my journey
              </p>
            </motion.div>

            {blogPosts.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                <p className="text-lg">No posts yet. Stay tuned!</p>
              </div>
            ) : (
              <>
                <motion.div
                  className="grid gap-6 md:grid-cols-3 mb-12"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {blogPosts.slice(0, 3).map((post) => (
                    <BlogCardTiltWrapper key={post.slug}>
                      <motion.div
                        variants={fadeInUp}
                        className="GlassCard rounded-2xl p-6 flex flex-col items-start transition-all duration-300 hover:scale-[1.02]"
                      >
                        <Link
                          to={`/blog/${post.slug}`}
                          className="block w-full focus:outline-none focus:ring-2 focus:ring-primary rounded-lg"
                        >
                          <h3 className="text-lg font-semibold text-primary mb-2 dark:text-primary flex items-center gap-2">
                            {post.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500 mb-3 dark:text-gray-400">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{calculateReadingTime(post.body)}</span>
                          </div>
                          <p className="text-gray-700 dark:text-gray-200">{post.summary}</p>
                        </Link>
                      </motion.div>
                    </BlogCardTiltWrapper>
                  ))}
                </motion.div>

                <div className="text-center">
                  <Link to="/blog">
                    <Button className="inline-flex items-center gap-2">
                      See All Posts
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
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <TestimonialsCarousel />

        {/* Contact Section */}
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[10vh] text-lg">
              Loading Contact...
            </div>
          }
        >
          <Contact />
        </Suspense>
      </div>
    </>
  );
}
