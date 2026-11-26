import React, { lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  FaAward,
  FaCheckCircle,
  FaDocker,
  FaGithub,
  FaGitAlt,
  FaLinkedin,
  FaLinux,
  FaPython,
  FaRobot,
  FaTelegram,
  FaUserGraduate,
} from 'react-icons/fa';
import { SiDribbble, SiLeetcode } from 'react-icons/si';
import type { IconType } from 'react-icons';
import SectionHeading from '../components/SectionHeading';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { timelineData } from '../data/timeline';

const InteractiveTimeline = lazy(() => import('../components/InteractiveTimeline'));
const SkillNetwork = lazy(() => import('../components/SkillNetwork'));

const portrait = '/images/optimized/profile_pic.webp';

const skills: Array<{ label: string; detail: string; icon: IconType }> = [
  { label: 'Python', detail: 'Analysis, ML pipelines and APIs', icon: FaPython },
  { label: 'Pandas / NumPy', detail: 'Data cleaning and insight extraction', icon: FaCheckCircle },
  { label: 'PyTorch / TensorFlow', detail: 'Deep learning experiments', icon: FaRobot },
  { label: 'NLP / LLMs', detail: 'Fine-tuning, prompting and RAG', icon: FaRobot },
  { label: 'Docker', detail: 'Containerised model APIs', icon: FaDocker },
  { label: 'Git', detail: 'Collaborative development', icon: FaGitAlt },
  { label: 'Linux CLI', detail: 'Development and deployment', icon: FaLinux },
  { label: 'SQL / SQLite', detail: 'Relational data work', icon: FaCheckCircle },
];

const certificates = [
  {
    title: 'AI Engineering Bootcamp',
    issuer: 'Ostad',
    image: '/images/certificates/ostad-ai-bootcamp.png',
    href: 'https://ostad.app/share/certificate/c33905-md-aminul-islam-bhuiyan-amin',
  },
  {
    title: 'Machine Learning Professional',
    issuer: 'IBM (Coursera)',
    image: '/images/certificates/ibm-ml-certificate.png',
    href: 'https://www.coursera.org/account/accomplishments/specialization/HCCYS47OIV8Y',
  },
  {
    title: 'Neural Networks & Deep Learning',
    issuer: 'DeepLearning.AI (Coursera)',
    image: '/images/certificates/coursera-deep-learning.png',
    href: 'https://www.coursera.org/account/accomplishments/verify/WU5WQ7J3TGBI',
  },
  {
    title: 'SQL and Relational Databases',
    issuer: 'IBM (Cognitive Class)',
    image: '/images/certificates/ibm-sql-databases.png',
    href: 'https://courses.cognitiveclass.ai/certificates/0bfe1618a2f141dbbc2ac87a2f628ef0',
  },
  {
    title: 'Data Analytics (Python)',
    issuer: 'BUBT-TAFE',
    image: '/images/certificates/bubt-data-analytics.png',
    href: '/images/certificates/bubt-data-analytics.png',
  },
];

const socials: Array<{ label: string; href?: string; icon: IconType }> = [
  { label: 'GitHub', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin },
  { label: 'LeetCode', href: profile.leetcode, icon: SiLeetcode },
  { label: 'Behance', href: profile.behance, icon: SiDribbble },
  { label: 'Telegram', href: profile.telegram, icon: FaTelegram },
].filter((item): item is { label: string; href: string; icon: IconType } => Boolean(item.href));

export default function About(): React.ReactElement {
  const featured = projects.filter((project) => project.featured).slice(0, 3);

  return (
    <div className="relative z-10 min-h-screen pb-32">
      <Helmet>
        <title>About | Aminul Islam Bhuiyan Amin</title>
        <meta
          name="description"
          content="Learn more about Aminul Islam Bhuiyan Amin, AI engineering student and data analyst based in Dhaka."
        />
        <meta property="og:title" content="About | Aminul Islam Bhuiyan Amin" />
        <meta
          property="og:description"
          content="Learn more about Aminul Islam Bhuiyan Amin, AI engineering student and data analyst based in Dhaka."
        />
        <meta property="og:image" content="https://aminul01-g.github.io/logo512.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aminul01-g.github.io/#/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About | Aminul Islam Bhuiyan Amin" />
        <meta
          name="twitter:description"
          content="Learn more about Aminul Islam Bhuiyan Amin, AI engineering student and data analyst based in Dhaka."
        />
        <meta name="twitter:image" content="https://aminul01-g.github.io/logo512.png" />
        <link rel="canonical" href="https://aminul01-g.github.io/#/about" />
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
                item: 'https://aminul01-g.github.io/#/about',
              },
            ],
          })}
        </script>
      </Helmet>

      <div className="mx-auto max-w-6xl px-5 pt-28 sm:px-8">
        <section className="bento-card grid items-center gap-12 pb-20 md:grid-cols-[1.3fr_0.7fr]">
          <div>
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-xs text-[var(--accent-2)]">01</span>
              <span className="section-rule w-12" aria-hidden="true" />
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted)]">
                About / BUBT, Dhaka
              </span>
            </div>
            <h1 className="text-[clamp(2.75rem,6vw,4.75rem)] font-bold leading-[1.05] tracking-[-0.05em] text-[var(--ink)]">
              {profile.name}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-[var(--muted)]">{profile.title}</p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-[var(--muted)] transition-colors hover:text-[var(--link)]"
                  aria-label={`${label} profile`}
                >
                  <Icon aria-hidden="true" />
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xs">
            <div className="aspect-[4/5] overflow-hidden rounded-[28px] border border-[var(--hairline-strong)] bg-white/[0.03]">
              <img
                src={portrait}
                alt={`Portrait of ${profile.name}`}
                width={1080}
                height={1350}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
            <p className="mt-4 text-center font-mono text-xs uppercase tracking-[0.24em] text-[var(--muted)]">
              Dhaka, Bangladesh
            </p>
          </div>
        </section>

        <section className="bento-card mb-24">
          <SectionHeading
            index="01"
            label="Summary"
            title="What I work on."
            description="AI engineering student, data analyst, and builder of practical intelligent systems."
          />
          <div className="grid gap-8 md:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-5 text-lg leading-relaxed text-[var(--muted)]">
              <p>
                I&apos;m a Computer Science and Engineering undergraduate at Bangladesh University
                of Business &amp; Technology, focused on AI, Python, and real-world intelligent
                systems. My interests include machine learning, deep learning, NLP, and LLMs.
              </p>
              <p>
                Since June 2024 I have worked as a Data Analyst at Intelligent Image Management Inc.
                in Dhaka, analysing datasets with Python, NumPy and Pandas, supporting predictive
                analytics and preprocessing, and collaborating with cross-functional teams on
                research-driven insights.
              </p>
              <p>
                I build and deploy AI solutions that connect academic research with practical use —
                from model evaluation and reproducible experimentation to containerised APIs.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h2 className="mb-4 font-mono text-xs uppercase tracking-[0.24em] text-[var(--accent-2)]">
                At a glance
              </h2>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-[var(--muted)]">Studying</dt>
                  <dd className="font-medium">BSc CSE, BUBT — expected 2027</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Working</dt>
                  <dd className="font-medium">Data Analyst, IIMI — since 2024</dd>
                </div>
                <div>
                  <dt className="text-[var(--muted)]">Focus</dt>
                  <dd className="font-medium">ML · NLP · LLMs · Deployment</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        <section className="bento-card mb-24">
          <SectionHeading
            index="02"
            label="Skills"
            title="Tools I use."
            description="No proficiency scores — just the tools and the work they support."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map(({ label, detail, icon: Icon }) => (
              <div key={label} className="glass-card rounded-2xl p-5">
                <Icon className="mb-4 text-2xl text-[var(--accent-2)]" aria-hidden="true" />
                <h3 className="font-semibold">{label}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 h-[420px] overflow-hidden rounded-2xl border border-[var(--hairline)] p-2">
            <Suspense fallback={<div className="h-full w-full" aria-hidden="true" />}>
              <SkillNetwork />
            </Suspense>
          </div>
        </section>

        <section className="bento-card mb-24">
          <SectionHeading
            index="03"
            label="Journey"
            title="How I got here."
            description="Education, hands-on projects and professional work."
          />
          <Suspense fallback={<div className="min-h-[240px]" aria-hidden="true" />}>
            <InteractiveTimeline items={timelineData} />
          </Suspense>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="glass-card rounded-2xl p-6">
              <FaUserGraduate className="mb-4 text-2xl text-[var(--accent-2)]" aria-hidden="true" />
              <h3 className="text-lg font-semibold">B.Sc. in Computer Science &amp; Engineering</h3>
              <a
                href="https://bubt.edu.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm text-[var(--link)] hover:underline"
              >
                Bangladesh University of Business &amp; Technology
              </a>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Expected graduation: September 2027
              </p>
            </article>
            <article className="glass-card rounded-2xl p-6">
              <FaAward className="mb-4 text-2xl text-[var(--accent-2)]" aria-hidden="true" />
              <h3 className="text-lg font-semibold">Data Analyst</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Intelligent Image Management Inc. (IIMI), Dhaka — June 2024 to present
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--muted)]">
                <li>Analysed datasets to extract insights with Python, NumPy and Pandas.</li>
                <li>Supported predictive analytics and data preprocessing.</li>
                <li>Collaborated with cross-functional teams on research-driven insights.</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="bento-card mb-24">
          <SectionHeading
            index="04"
            label="Work"
            title="Featured projects."
            description="Three pieces of work I would show first. The full index lives on the projects page."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="glass-card group rounded-2xl p-6 transition-colors hover:border-[var(--hairline-strong)]"
              >
                <p className="font-mono text-xs text-[var(--accent-2)]">
                  {project.date?.slice(0, 7) || 'Project'}
                </p>
                <h3 className="mt-3 text-lg font-semibold group-hover:text-[var(--link)]">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-3 text-sm text-[var(--muted)]">
                  {project.description}
                </p>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.2em] text-[var(--link)]">
                  View case study →
                </p>
              </Link>
            ))}
          </div>
          <Link to="/projects" className="btn mt-8 inline-flex">
            See all projects
          </Link>
        </section>

        <section className="bento-card mb-24">
          <SectionHeading
            index="05"
            label="Credentials"
            title="Certificates &amp; recognition."
            description="Verified certificates and activities from the last few years."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((certificate) => (
              <a
                key={certificate.title}
                href={certificate.href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card group overflow-hidden rounded-2xl"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={certificate.image}
                    alt={`${certificate.title} certificate`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold leading-snug">{certificate.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">{certificate.issuer}</p>
                </div>
              </a>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {[
              'Runner-Up – BIUCPC & ICPC Programming Contest, 2023 & 2025',
              'Member – BUBT AI Club',
              'Volunteered mentoring high school students in Python & ML basics',
              'Active contributor to AI forums and GitHub discussions',
            ].map((award) => (
              <div key={award} className="glass-card flex items-start gap-4 rounded-2xl p-5">
                <FaCheckCircle className="mt-0.5 text-[var(--accent-2)]" aria-hidden="true" />
                <p className="text-sm text-[var(--muted)]">{award}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bento-card mb-16 text-center">
          <SectionHeading
            index="06"
            label="Contact"
            title="Let's connect."
            description="Interested in collaborating, hiring, or talking about AI? Reach out."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex"
            >
              View résumé
            </a>
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn inline-flex"
              >
                <FaLinkedin aria-hidden="true" />
                Connect on LinkedIn
              </a>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
