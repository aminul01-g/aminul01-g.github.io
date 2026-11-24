import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Hero from './Hero';
import Achievements from '../components/Achievements';
import Contact from './Contact';
import FeaturedProjectCard from '../components/FeaturedProjectCard';
import BlogCardTiltWrapper from '../components/BlogCardTiltWrapper';
import ImageWithFallback from '../components/ImageWithFallback';
import LinkButton from '../components/LinkButton';
import SectionHeading from '../components/SectionHeading';
import TechMarquee from '../components/TechMarquee';
import InteractiveTimeline from '../components/InteractiveTimeline';
import { projects } from '../data/projects';
import { blogPosts } from '../data/blog';
import { timelineData } from '../data/timeline';
import { calculateReadingTime } from '../utils/readingTime';
import { usePageTracking } from '../hooks/useAnalytics';
import { FaRobot, FaCode, FaChartBar, FaTools } from 'react-icons/fa';

const aboutSummary =
  "I'm an AI-driven Computer Science student at BUBT, passionate about building intelligent systems. My focus is Deep Learning, NLP and LLMs — with hands-on experience in PyTorch, TensorFlow and Hugging Face. Lately I've been exploring prompt engineering, multimodal AI and LangChain-based applications.";

const skillsData = [
  {
    title: 'AI / ML',
    icon: <FaRobot className="h-5 w-5" />,
    skills: [
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'LangChain',
      'LangGraph',
      'CrewAI',
      'LLMs',
      'Computer Vision',
    ],
  },
  {
    title: 'Programming',
    icon: <FaCode className="h-5 w-5" />,
    skills: ['Python', 'TypeScript', 'C', 'C++', 'Java'],
  },
  {
    title: 'Data Science',
    icon: <FaChartBar className="h-5 w-5" />,
    skills: ['Pandas', 'NumPy', 'Data Analysis', 'Data Visualization'],
  },
  {
    title: 'Tools',
    icon: <FaTools className="h-5 w-5" />,
    skills: ['Docker', 'Git', 'AWS', 'Linux', 'MLOps'],
  },
];

const marqueeItems = [
  'Python',
  'PyTorch',
  'TensorFlow',
  'LangChain',
  'LangGraph',
  'RAG',
  'LLMs',
  'Computer Vision',
  'NLP',
  'Pandas',
  'NumPy',
  'Docker',
  'TypeScript',
  'React',
];

export default function Home(): React.ReactElement {
  usePageTracking('/', 'Home');
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>Home | Aminul Islam Bhuiyan Amin</title>
        <meta
          name="description"
          content="Portfolio and blog of Md Aminul Islam Bhuiyan Amin, AI-driven Computer Science student at BUBT. Explore projects, skills, and writing on AI, ML and software engineering."
        />
        <meta property="og:title" content="Home | Aminul Islam Bhuiyan Amin" />
        <meta
          property="og:description"
          content="Portfolio and blog of Md Aminul Islam Bhuiyan Amin, AI-driven Computer Science student at BUBT."
        />
        <meta property="og:image" content="https://aminul01-g.github.io/logo512.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aminul01-g.github.io/" />
        <link rel="canonical" href="https://aminul01-g.github.io/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Md Aminul Islam Bhuiyan Amin',
            jobTitle: 'AI Engineer & Computer Science Student',
            description:
              'AI-driven Computer Science student at BUBT, building intelligent systems.',
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
            sameAs: ['https://github.com/aminul01-g', 'https://linkedin.com/in/aminulai'],
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
              'https://aminul01-g.github.io/#/about',
              'https://aminul01-g.github.io/#/projects',
              'https://aminul01-g.github.io/#/blog',
            ],
          })}
        </script>
      </Helmet>

      <div className="relative z-10 w-full min-h-screen pb-24">
        <Hero />
        <TechMarquee items={marqueeItems} />

        {/* 01 — About */}
        <section id="about" className="bento-card scroll-mt-24">
          <SectionHeading
            index="01"
            label="About"
            title="Turning research into software that works."
            description="A look at who I am, what I work with, and how I think about building intelligent systems."
          />
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <motion.div>
              <div className="relative mx-auto aspect-[4/5] w-56 overflow-hidden rounded-2xl border border-[var(--hairline)] shadow-glass sm:w-64 lg:mx-0">
                <ImageWithFallback
                  src="/images/optimized/profile_pic.webp"
                  alt="Portrait of Aminul"
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="mt-6 rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5">
                <p className="font-mono text-[0.66rem] uppercase tracking-[0.2em] text-[var(--accent-2)]">
                  Currently
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                  Exploring prompt engineering, multimodal AI and LangChain-based applications while
                  studying at BUBT.
                </p>
              </div>
            </motion.div>

            <div>
              <motion.p className="text-xl font-medium leading-relaxed text-[var(--ink)] md:text-2xl">
                {aboutSummary}
              </motion.p>
              <motion.div className="mt-10 grid gap-4 sm:grid-cols-2">
                {skillsData.map((group) => (
                  <motion.div
                    key={group.title}
                    className="rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-5"
                  >
                    <div className="mb-4 flex items-center gap-3 text-[var(--accent-2)]">
                      {group.icon}
                      <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--ink)]">
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-[var(--hairline)] px-3 py-1 text-xs text-[var(--muted)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              <div className="mt-8">
                <LinkButton to="/about">More about me</LinkButton>
              </div>
            </div>
          </div>
        </section>

        {/* 02 — Achievements */}
        <section className="bento-card">
          <SectionHeading
            index="02"
            label="Recognition"
            title="Milestones worth noting."
            description="Competitions, certifications and problem-solving work backed by artifacts."
          />
          <Achievements />
        </section>

        {/* 03 — Experience */}
        <InteractiveTimeline
          items={timelineData}
          title="Experience & Education"
          subtitle="A brief journey through my academic and professional work"
        />

        {/* 04 — Work */}
        <section id="work" className="bento-card scroll-mt-24">
          <SectionHeading
            index="04"
            label="Selected work"
            title="Things I've actually built."
            description="A few projects where I owned the problem, the implementation and the outcome."
          />
          <motion.div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project, i) => (
              <FeaturedProjectCard
                key={project.slug}
                project={project}
                index={i}
                total={featured.length}
              />
            ))}
          </motion.div>
          <div className="mt-10">
            <LinkButton to="/projects">All projects</LinkButton>
          </div>
        </section>

        {/* 05 — Writing */}
        <section className="bento-card">
          <SectionHeading
            index="05"
            label="Writing"
            title="Notes from the journey."
            description="Occasional writing about AI, machine learning and the things I learn along the way."
          />
          {blogPosts.length === 0 ? (
            <p className="text-[var(--muted)]">No posts yet. Stay tuned.</p>
          ) : (
            <>
              <motion.div className="grid gap-5 md:grid-cols-3">
                {blogPosts.slice(0, 3).map((post) => (
                  <BlogCardTiltWrapper key={post.slug}>
                    <motion.div className="h-full rounded-2xl border border-[var(--hairline)] bg-[var(--surface)] p-6 transition duration-300 hover:border-[var(--hairline-strong)]">
                      <a
                        href={`#/blog/${post.slug}`}
                        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-2)]"
                      >
                        <h3 className="text-lg font-semibold text-[var(--ink)]">{post.title}</h3>
                        <p className="mt-2 font-mono text-xs text-[var(--muted)]">
                          {post.date} · {calculateReadingTime(post.body)}
                        </p>
                        <p className="blog-excerpt mt-4 text-sm text-[var(--muted)]">
                          {post.summary}
                        </p>
                      </a>
                    </motion.div>
                  </BlogCardTiltWrapper>
                ))}
              </motion.div>
              <div className="mt-10">
                <LinkButton to="/blog">All posts</LinkButton>
              </div>
            </>
          )}
        </section>

        <Contact />
      </div>
    </>
  );
}
