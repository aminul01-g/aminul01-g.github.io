import { motion } from 'framer-motion';
import {
  FaGithub,
  FaLinkedin,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaDatabase,
  FaAward,
  FaRobot,
  FaCheckCircle,
  FaUserGraduate,
} from 'react-icons/fa';
import { SiFoodpanda } from 'react-icons/si';
import { GiFamilyTree } from 'react-icons/gi';
import React, { Suspense, lazy } from 'react';
import ImageWithFallback from '../components/ImageWithFallback';
import { profile } from '../data/profile';
import { timelineData } from '../data/timeline';
import { countersData } from '../data/counters';
import { Helmet } from 'react-helmet-async';

const InteractiveTimeline = lazy(() => import('../components/InteractiveTimeline'));
const AnimatedCounters = lazy(() => import('../components/AnimatedCounters'));
const SkillNetwork = lazy(() => import('../components/SkillNetwork'));

// GlassBg removed — FixedBackground is now global in App.tsx

const profilePic = '/images/optimized/profile_pic.webp';

export default function About(): React.ReactElement {
  // Project cards data must be inside the function, before return
  const projectData = [
    {
      icon: FaPython,
      label: 'MNIST Digit Classifier',
      desc: 'Built a ',
      stack: 'CNN',
      stackColor: 'text-primary font-semibold dark:text-indigo-300',
      details: ' in PyTorch with ~99% accuracy on handwritten digit classification.',
    },
    {
      icon: FaRobot,
      label: 'NLP Text Classification Pipeline',
      desc: 'Developed full pipeline (tokenization to evaluation) using ',
      stack: 'Hugging Face Transformers',
      stackColor: 'text-primary font-semibold dark:text-indigo-300',
      details: '.',
    },
    {
      icon: FaLinux,
      label: 'CPU Scheduler Simulator',
      desc: 'CLI-based scheduling simulation tool comparing ',
      stack: 'FCFS, SJF, and Priority',
      stackColor: 'text-primary font-semibold dark:text-indigo-300',
      details: ' algorithms.',
    },
    {
      icon: FaDatabase,
      label: 'Image Caption Generator',
      desc: 'Created an ',
      stack: 'LSTM + CNN',
      stackColor: 'text-primary font-semibold dark:text-indigo-300',
      details: ' model combining ResNet50 encoder and LSTM decoder.',
    },
    {
      icon: FaDocker,
      label: 'Transformer Chatbot API',
      desc: 'Fine-tuned a Transformer-based chatbot and deployed via ',
      stack: 'Flask & Docker',
      stackColor: 'text-primary font-semibold dark:text-indigo-300',
      details: '.',
    },
    {
      icon: FaRobot,
      label: 'AI-Powered Study Assistant App',
      desc: 'Developed a desktop productivity tool combining task tracking with ',
      stack: 'GPT-powered assistance',
      stackColor: 'text-primary font-semibold dark:text-indigo-300',
      details: '.',
    },
  ];

  // handleContactClick removed as it was unused

  return (
    <div className="relative min-h-screen pb-32 overflow-x-hidden z-10">
      <Helmet>
        <title>About | Aminul Islam Bhuiyan Amin</title>
        <meta
          name="description"
          content="Learn more about Aminul Islam Bhuiyan Amin, AI-driven Computer Science student at BUBT."
        />
        <meta property="og:title" content="About | Aminul Islam Bhuiyan Amin" />
        <meta
          property="og:description"
          content="Learn more about Aminul Islam Bhuiyan Amin, AI-driven Computer Science student at BUBT."
        />
        <meta property="og:image" content="https://aminul01-g.github.io/logo512.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aminul01-g.github.io/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About | Aminul Islam Bhuiyan Amin" />
        <meta
          name="twitter:description"
          content="Learn more about Aminul Islam Bhuiyan Amin, AI-driven Computer Science student at BUBT."
        />
        <meta name="twitter:image" content="https://aminul01-g.github.io/logo512.png" />
        <link rel="canonical" href="https://aminul01-g.github.io/about" />
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
              {
                '@type': 'ListItem',
                position: 2,
                name: 'About',
                item: 'https://aminul01-g.github.io/about',
              },
            ],
          })}
        </script>
      </Helmet>
      {/* Hero Banner */}
      <motion.section
        className="relative z-20 w-full flex flex-col md:flex-row items-center justify-between px-6 sm:px-12 pt-20 pb-16 max-w-6xl mx-auto mb-16 overflow-hidden"
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          aria-hidden
        >
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-purple-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-purple-400/30 to-blue-400/10 rounded-full blur-2xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-primary/20 to-indigo-400/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 animate-spin-slow" />
        </motion.div>
        <div className="flex-1 text-center md:text-left mb-10 md:mb-0 relative z-10">
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 text-[var(--theme-text-primary)] drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] animate-fadeInUp text-center md:text-left">
            Md Aminul Islam Bhuiyan Amin
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-6 justify-center md:justify-start">
            <span className="inline-flex items-center gap-2 text-xl font-semibold text-[var(--theme-text-primary)] text-opacity-90 animate-fadeInUp delay-100">
              <FaUserGraduate className="text-[var(--theme-text-primary)] text-opacity-90" />
              AI Engineer & Computer Science and Engineering Student
            </span>
          </div>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-4 animate-fadeInUp delay-200">
            <a
              href="https://github.com/aminul01-g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--theme-text-primary)] text-opacity-60 hover:text-primary transition-colors  dark:hover:text-primary"
            >
              <FaGithub />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/aminulai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--theme-text-primary)] text-opacity-60 hover:text-primary transition-colors  dark:hover:text-primary"
            >
              <FaLinkedin />
              LinkedIn
            </a>
            <a
              href="https://leetcode.com/u/aminul01-lc/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--theme-text-primary)] text-opacity-60 hover:text-primary transition-colors  dark:hover:text-primary"
            >
              <span className="text-yellow-500">LC</span>LeetCode
            </a>
            <a
              href="https://behance.net/aminul01g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--theme-text-primary)] text-opacity-60 hover:text-primary transition-colors  dark:hover:text-primary"
            >
              <span className="text-blue-500">Bē</span>Behance
            </a>
            <a
              href="https://t.me/aminul01g"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[var(--theme-text-primary)] text-opacity-60 hover:text-primary transition-colors  dark:hover:text-primary"
            >
              <span className="text-blue-400">TG</span>Telegram
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
            {/*<a href="#contact" className="btn inline-flex items-center gap-2 group">
              Contact Me
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>*/}
            {/* Add resume link if available */}
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2 group"
            >
              View Resume
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
            </a>
          </div>
        </div>
        <div className="flex-1 flex justify-center md:justify-end animate-fadeInUp delay-300 relative z-10">
          <div className="GlassCard rounded-full shadow-2xl overflow-hidden w-44 h-44 sm:w-60 sm:h-60 flex items-center justify-center relative mx-auto transition-transform duration-500 hover:scale-105">
            <ImageWithFallback
              src={profilePic}
              alt="Profile"
              className="w-full h-full object-cover mx-auto"
              loading="lazy"
            />
            {/* Subtle glowing ring effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/10 to-indigo-500/10 dark:from-primary/20 dark:to-indigo-500/20 blur-md pointer-events-none" />
            {/* Enhanced border glow for better visibility */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/30 dark:border-primary/50 pointer-events-none" />
          </div>
        </div>
      </motion.section>

      {/* Professional Summary */}
      <motion.div
        className="relative z-20 max-w-2xl mx-auto GlassCard rounded-3xl shadow-2xl p-8 sm:p-10 mb-20 flex flex-col items-center animate-fadeInUp mt-16"
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        aria-label="Professional summary"
      >
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold mb-4 text-[var(--theme-text-primary)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center gap-2 animate-fadeInUp text-center"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🧠 Summary
        </motion.h2>
        <div className="mb-4">
          <span className="inline-block bg-white/10 text-white border border-white/20 font-bold px-4 py-2 rounded-full text-lg shadow-sm animate-fadeInUp">
            Empowering the future with AI & Intelligent Systems
          </span>
        </div>
        <p className="text-[var(--theme-text-primary)] text-opacity-[0.70] text-lg text-center mb-2 animate-fadeInUp delay-100">
          I&apos;m a passionate and driven Computer Science and Engineering undergraduate at
          Bangladesh University of Business & Technology (BUBT), focused on
          <span className="inline-flex items-center gap-1 font-semibold text-primary dark:text-indigo-300 ml-1">
            <FaRobot aria-hidden="true" />
            AI
          </span>
          ,
          <span className="inline-flex items-center gap-1 font-semibold text-indigo-500 dark:text-indigo-300 ml-1">
            <FaPython aria-hidden="true" />
            Python
          </span>
          , and real-world intelligent systems. My core interests lie in
          <span className="text-indigo-500 font-semibold dark:text-indigo-300 ml-1">
            machine learning
          </span>
          ,
          <span className="text-indigo-500 font-semibold dark:text-indigo-300 ml-1">
            deep learning
          </span>
          ,<span className="text-indigo-500 font-semibold dark:text-indigo-300 ml-1">NLP</span>, and
          <span className="text-indigo-500 font-semibold dark:text-indigo-300 ml-1">LLMs</span>.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-2 animate-fadeInUp delay-150">
          <span className="inline-flex items-center gap-1 themed-badge themed-badge-blue font-semibold px-3 py-1 rounded-full text-sm">
            <FaPython />
            Python
          </span>
          <span className="inline-flex items-center gap-1 themed-badge themed-badge-green font-semibold px-3 py-1 rounded-full text-sm">
            <FaRobot />
            AI/ML
          </span>
          <span className="inline-flex items-center gap-1 themed-badge themed-badge-yellow font-semibold px-3 py-1 rounded-full text-sm">
            <FaDocker />
            Docker
          </span>
          <span className="inline-flex items-center gap-1 themed-badge themed-badge-gray font-semibold px-3 py-1 rounded-full text-sm">
            <FaLinux />
            Linux
          </span>
        </div>
        <p className="text-[var(--theme-text-primary)] text-opacity-[0.70] text-lg text-center animate-fadeInUp delay-200">
          With a strong foundation in
          <span className="text-primary font-semibold dark:text-indigo-300 ml-1">Python</span>,
          <span className="text-primary font-semibold dark:text-indigo-300 ml-1">PyTorch</span>, and
          <span className="text-primary font-semibold dark:text-indigo-300 ml-1">
            Linux-based development
          </span>
          , I build and deploy scalable AI solutions that combine academic research with practical
          applications. I enjoy solving complex problems, contributing to open-source projects, and
          mentoring others in the field of AI.
        </p>
      </motion.div>

      {/* Skills & Tools Section */}
      <motion.section
        className="relative z-20 max-w-5xl mx-auto mb-20 px-4 py-12 GlassCard rounded-3xl animate-fadeInUp mt-16"
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-4xl font-extrabold mb-10 text-[var(--theme-text-primary)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fadeInUp text-center sm:text-left"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🛠 Technical Skills
        </motion.h2>

        {/* Interactive Skill Network */}
        <div className="mb-12 animate-fadeInUp">
          <Suspense fallback={<div className="h-64 flex items-center justify-center">Loading Network...</div>}>
            <SkillNetwork />
          </Suspense>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
          {/* Skill tags with glass, hover, and fade-in, plus progress bars */}
          {[
            { icon: FaPython, label: 'Python', level: 95 },
            { icon: SiFoodpanda, label: 'Pandas', level: 90 },
            { icon: FaDocker, label: 'Docker', level: 80 },
            { icon: FaGitAlt, label: 'Git', level: 85 },
            { icon: FaLinux, label: 'Linux CLI', level: 90 },
            { icon: FaDatabase, label: 'SQL/SQLite', level: 75 },
            { icon: GiFamilyTree, label: 'Deep Learning', level: 88 },
            { icon: FaRobot, label: 'NLP/LLMs', level: 85 },
          ].map((skill, i) => (
            <motion.div
              key={skill.label}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.08, delay: i * 0.03 }}
              className="GlassCard p-6 flex flex-col items-center cursor-pointer animate-fadeInUp group"
              tabIndex={0}
            >
              {skill.icon && (
                <skill.icon className="text-4xl text-primary dark:text-indigo-300 mb-2" />
              )}
              <span className="font-semibold  text-base mb-2">{skill.label}</span>
              {/* Progress bar */}
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mb-1">
                <div
                  className="h-2 bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className="text-xs text-[var(--theme-text-primary)] text-opacity-60">{skill.level}%</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interactive Timeline - moved up for visibility */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[10vh] text-lg">
            Loading Timeline...
          </div>
        }
      >
        <InteractiveTimeline items={timelineData} />
      </Suspense>

      {/* Education & Experience */}
      <motion.section
        className="max-w-5xl mx-auto mb-16 px-4 py-12 GlassCard rounded-3xl animate-fadeInUp relative mt-16 z-20"
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-4xl font-extrabold mb-8 text-[var(--theme-text-primary)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] text-center"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🎓 Education
        </motion.h2>
        <motion.div
          className="GlassCard p-7 mb-10 flex items-center gap-5 transition-all duration-300 hover:scale-[1.02]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="https://bubt.edu.bd/"
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
          >
            <ImageWithFallback
              src="/bubt-seeklogo.png"
              alt="BUBT Logo"
              className="w-16 h-16 rounded-full bg-white border-2 border-primary/30 shadow-lg object-contain p-1 mr-2 transition-transform duration-200 hover:scale-105"
              loading="lazy"
            />
          </a>
          <div>
            <div className="font-semibold text-lg ">
              B.Sc. in Computer Science & Engineering
            </div>
            <a
              href="https://bubt.edu.bd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--theme-text-primary)] text-opacity-80 underline hover:text-primary transition-colors"
            >
              Bangladesh University of Business & Technology (BUBT)
            </a>
            <div className="text-[var(--theme-text-primary)] text-opacity-60 text-sm ">
              Expected Graduation: September 2027
            </div>
          </div>
        </motion.div>
        <motion.h2
          className="text-4xl font-extrabold mb-8 text-[var(--theme-text-primary)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          💼 Experience
        </motion.h2>
        <motion.div
          className="GlassCard p-7 mb-4 flex flex-col transition-all duration-300 hover:scale-[1.02]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-purple-400/30 to-blue-400/20 shadow-inner">
              <FaAward className="text-2xl text-primary dark:text-indigo-300" />
            </div>
            <span className="font-semibold text-lg ">Data Analyst</span>
            <span className="text-[var(--theme-text-primary)] text-opacity-60 text-sm ">
              Intelligent Image Management Inc. (IIMI), Dhaka — June 2024–Present
            </span>
          </div>
          <ul className="list-disc list-inside text-[var(--theme-text-primary)] ml-2 ">
            <li>
              Analyzed large datasets to{' '}
              <span className="text-indigo-500 font-semibold dark:text-indigo-300">
                extract insights
              </span>{' '}
              using Python, NumPy, and Pandas.
            </li>
            <li>
              Supported predictive analytics and data preprocessing using{' '}
              <span className="text-primary font-semibold dark:text-indigo-300">Python</span> and{' '}
              <span className="text-primary font-semibold dark:text-indigo-300">Pandas</span>.
            </li>
            <li>Collaborated with cross-functional teams on research-driven insights.</li>
          </ul>
        </motion.div>
      </motion.section>
      {/* Projects & AI Engineering Experience */}
      <motion.section
        className="relative z-20 max-w-5xl mx-auto mb-20 px-4 py-12 GlassCard rounded-3xl animate-fadeInUp mt-16"
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-4xl font-extrabold mb-10 text-[var(--theme-text-primary)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fadeInUp text-center sm:text-left"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🚀 AI Engineering Experience
        </motion.h2>
        <div className="grid gap-10 md:grid-cols-2">
          {projectData.map((proj, i) => (
            <motion.div
              key={proj.label}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.08, delay: i * 0.04 }}
              className="relative GlassCard p-7 flex items-start gap-4 transition-all duration-300 cursor-pointer animate-fadeInUp group"
              tabIndex={0}
            >
              <div className="absolute left-4 top-4">
                <proj.icon className="text-2xl text-indigo-400 dark:text-indigo-300 opacity-80" />
              </div>
              <div className="pl-10">
                <div className="font-semibold mb-1  text-lg flex items-center gap-2">
                  {proj.label}
                </div>
                <ul className="list-disc list-inside text-[var(--theme-text-primary)] ml-2 text-sm ">
                  <li>
                    {proj.desc}
                    <span className={proj.stackColor}>{proj.stack}</span>
                    {proj.details}
                  </li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Certifications & Achievements */}
      <motion.section
        className="relative z-20 max-w-5xl mx-auto mb-20 px-4 py-12 GlassCard rounded-3xl animate-fadeInUp mt-16"
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-4xl font-extrabold mb-10 text-[var(--theme-text-primary)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fadeInUp text-center"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📜 Certifications
        </motion.h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Certificate Cards */}
          <motion.a
            href="https://ostad.app/share/certificate/c33905-md-aminul-islam-bhuiyan-amin"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="group GlassCard overflow-hidden transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative overflow-hidden">
              <img
                src="/images/certificates/ostad-ai-bootcamp.png"
                alt="AI Engineering Bootcamp Certificate"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[var(--theme-text-primary)] mb-1">
                AI Engineering Bootcamp
              </h3>
              <p className="text-sm text-[var(--theme-text-primary)] text-opacity-80">Ostad</p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.coursera.org/account/accomplishments/specialization/HCCYS47OIV8Y"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="group GlassCard overflow-hidden transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="relative overflow-hidden">
              <img
                src="/images/certificates/ibm-ml-certificate.png"
                alt="IBM Machine Learning Professional Certificate"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[var(--theme-text-primary)] mb-1">
                Machine Learning Professional
              </h3>
              <p className="text-sm text-[var(--theme-text-primary)] text-opacity-80">IBM (Coursera)</p>
            </div>
          </motion.a>

          <motion.a
            href="https://www.coursera.org/account/accomplishments/verify/WU5WQ7J3TGBI"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="group GlassCard overflow-hidden transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative overflow-hidden">
              <img
                src="/images/certificates/coursera-deep-learning.png"
                alt="Neural Networks and Deep Learning Certificate"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[var(--theme-text-primary)] mb-1">
                Neural Networks & Deep Learning
              </h3>
              <p className="text-sm text-[var(--theme-text-primary)] text-opacity-80">DeepLearning.AI (Coursera)</p>
            </div>
          </motion.a>

          <motion.a
            href="https://courses.cognitiveclass.ai/certificates/0bfe1618a2f141dbbc2ac87a2f628ef0"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="group GlassCard overflow-hidden transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative overflow-hidden">
              <img
                src="/images/certificates/ibm-sql-databases.png"
                alt="SQL and Relational Databases Certificate"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[var(--theme-text-primary)] mb-1">
                SQL and Relational Databases
              </h3>
              <p className="text-sm text-[var(--theme-text-primary)] text-opacity-80">IBM (Cognitive Class)</p>
            </div>
          </motion.a>

          <motion.div
            className="group rounded-2xl glass-card border border-primary/20 dark:border-gray-700 shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="relative overflow-hidden">
              <img
                src="/images/certificates/bubt-data-analytics.png"
                alt="Data Analytics Certificate"
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-[var(--theme-text-primary)] mb-1">
                Data Analytics (Python)
              </h3>
              <p className="text-sm text-[var(--theme-text-primary)] text-opacity-80">BUBT-TAFE</p>
            </div>
          </motion.div>
        </div>
        <motion.h2
          className="text-4xl font-extrabold mt-16 mb-10 text-[var(--theme-text-primary)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-fadeInUp text-center sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🏆 Awards & Extracurriculars
        </motion.h2>
        <div className="grid gap-10 md:grid-cols-2">
          {/* Awards & Extracurriculars */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="GlassCard p-6 flex items-center gap-4 transition-all duration-300 cursor-pointer animate-fadeInUp"
          >
            <FaAward className="text-2xl text-primary dark:text-indigo-300" />
            <div>
              <div className="font-semibold ">
                Runner-Up – BIUCPC & ICPC Programming Contest. 2023, 2025
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="GlassCard p-6 flex items-center gap-4 transition-all duration-300 cursor-pointer animate-fadeInUp"
          >
            <FaRobot className="text-2xl text-primary dark:text-indigo-300" />
            <div>
              <div className="font-semibold ">Member – BUBT AI Club</div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="GlassCard p-6 flex items-center gap-4 transition-all duration-300 cursor-pointer animate-fadeInUp"
          >
            <FaUserGraduate className="text-2xl text-primary dark:text-indigo-300" />
            <div>
              <div className="font-semibold ">
                Volunteered mentoring high school students in Python & ML basics
              </div>
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="GlassCard p-6 flex items-center gap-4 transition-all duration-300 cursor-pointer animate-fadeInUp"
          >
            <FaGithub className="text-2xl text-primary dark:text-indigo-300" />
            <div>
              <div className="font-semibold ">
                Active contributor to AI-related forums and GitHub discussions
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section Divider */}
      <div className="h-8 w-full bg-gradient-to-b from-transparent via-purple-100/40 to-transparent dark:via-indigo-900/30 mb-12" />

      {/* Highlights Section - Modernized */}
      <motion.section
        className="max-w-4xl mx-auto mb-16 mt-32 z-20 relative"
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-3xl font-extrabold mb-8 text-[var(--theme-text-primary)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] text-center"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          📌 Highlights
        </motion.h2>
        <motion.div
          className="glass-card rounded-2xl p-8 flex flex-wrap gap-4 justify-center shadow-lg border border-white/30 dark:border-gray-700/60 backdrop-blur-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          <motion.span
            className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-5 py-3 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300 shadow-sm hover:scale-105 transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaCheckCircle />
            Strong skills in model evaluation, debugging ML pipelines, and reproducible
            experimentation.
          </motion.span>
          <motion.span
            className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-5 py-3 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300 shadow-sm hover:scale-105 transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <FaDocker />
            Deployed AI/ML models with Flask APIs and Docker containers in Linux environments.
          </motion.span>
          <motion.span
            className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-5 py-3 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300 shadow-sm hover:scale-105 transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FaGitAlt />
            Confident in using Git, collaborative workflows, and Agile-style development.
          </motion.span>
          <motion.span
            className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-5 py-3 rounded-full dark:bg-indigo-900/30 dark:text-indigo-300 shadow-sm hover:scale-105 transition-all duration-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <FaRobot />
            Familiar with prompt engineering and fine-tuning pre-trained LLMs for domain-specific
            tasks.
          </motion.span>
        </motion.div>
      </motion.section>

      {/* Animated Counters */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[10vh] text-lg">
            Loading Counters...
          </div>
        }
      >
        <AnimatedCounters counters={countersData} />
      </Suspense>

      {/* Let's Connect Section restored to About page */}
      <motion.section
        className="max-w-2xl mx-auto text-center mt-32 mb-16 z-20 relative"
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h2
          className="text-3xl font-extrabold mb-4 text-[var(--theme-text-primary)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Let&apos;s Connect!
        </motion.h2>
        <p className="mb-6 text-[var(--theme-text-primary)]">
          Interested in collaborating, hiring, or just want to chat about AI? Reach out.
        </p>
        <a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          className="btn bg-gradient-to-r from-primary to-indigo-500 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-indigo-200 dark:hover:shadow-indigo-900 transition-transform duration-200 inline-flex items-center gap-2"
          aria-label="View Resume"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          View Resume
        </a>
        <motion.a
          whileHover={{ scale: 1.07 }}
          href="https://linkedin.com/in/aminulai"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 btn bg-indigo-500 hover:bg-indigo-600 text-white font-bold px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-indigo-200 dark:hover:shadow-indigo-900 transition-transform duration-200 inline-flex items-center gap-2"
        >
          <FaLinkedin />
          Connect on LinkedIn
        </motion.a>
      </motion.section>
    </div>
  );
}
