import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../data/profile';
import Typewriter from '../components/Typewriter';
import ImageWithFallback from '../components/ImageWithFallback';
import Button from '../components/Button';

const socialLinks = [
  {
    href: profile.github,
    label: 'GitHub',
    path: 'M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.18 6.84 9.5.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.6 9.6 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.75c0 .26.18.57.69.48A10 10 0 0 0 22 12c0-5.52-4.48-10-10-10Z',
  },
  {
    href: profile.linkedin,
    label: 'LinkedIn',
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z',
  },
  {
    href: profile.leetcode,
    label: 'LeetCode',
    path: 'M8.7 14.3a1 1 0 0 1-1.4 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.4 1.4L5.42 12l3.28 2.3Zm6.6 0 3.28-2.3-3.28-2.3a1 1 0 1 1 1.4-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 1 1-1.4-1.4Z',
  },
  {
    href: profile.huggingface,
    label: 'Hugging Face',
    path: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM9.5 8.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Zm5 0a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM8.5 13h7a.5.5 0 0 1 .5.5c0 2.21-1.79 4-4 4s-4-1.79-4-4a.5.5 0 0 1 .5-.5Z',
  },
  {
    href: profile.telegram,
    label: 'Telegram',
    path: 'M9.04 16.57l-.4 5.61c.57 0 .82-.24 1.12-.54l2.67-2.56 5.55 4.05c1.01.56 1.74.27 1.99-.94l3.62-16.96c.37-1.63-.59-2.27-1.63-1.87L.94 8.03C-.68 8.66-.66 9.56.66 9.96l5.4 1.69 12.52-7.89c.59-.38 1.13-.17.69.21Z',
  },
];

const nameWords = profile.name.split(' ');
const firstLine = nameWords.slice(0, Math.ceil(nameWords.length / 2)).join(' ');
const secondLine = nameWords.slice(Math.ceil(nameWords.length / 2)).join(' ');

export default function Hero(): React.ReactElement {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-32 sm:pt-32">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <motion.div>
            <motion.p className="eyebrow mb-7">
              <span className="status-dot" aria-hidden="true" />
              AI engineer &amp; computer science student
            </motion.p>

            <motion.h1
              aria-label={profile.name}
              className="text-[clamp(2.9rem,8vw,5.6rem)] font-bold leading-[1.03] tracking-[-0.055em]"
            >
              <span className="block">{firstLine}</span>
              <span className="block text-gradient">{secondLine}</span>
            </motion.h1>

            <motion.p className="mt-7 font-mono text-sm uppercase tracking-[0.16em] text-[var(--theme-text-primary)] opacity-70">
              {profile.title}
            </motion.p>

            <motion.div className="mt-3 min-h-[2.6rem]">
              <Typewriter
                words={[profile.slogan, 'Turning research into working software.']}
                className="text-xl font-medium text-[var(--theme-text-primary)] sm:text-2xl"
                speed={55}
                pause={2200}
              />
            </motion.div>

            <motion.p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--theme-text-primary)] opacity-75 sm:text-lg">
              I build intelligent systems with Python, PyTorch and TensorFlow — and care about
              making them clear, useful and genuinely deployable.
            </motion.p>

            <motion.div className="mt-9 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="focus:outline-none">
                <Button variant="primary" size="lg" glow>
                  View projects
                </Button>
              </Link>
              {profile.resume && (
                <Button
                  variant="glass"
                  size="lg"
                  onClick={() => window.open(profile.resume, '_blank', 'noopener,noreferrer')}
                >
                  Résumé
                </Button>
              )}
            </motion.div>

            <motion.div className="mt-10 flex flex-wrap items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  title={link.label}
                  className="glass-card flex h-11 w-11 items-center justify-center rounded-xl opacity-80 transition duration-300 hover:opacity-100 hover:shadow-glow"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d={link.path} />
                  </svg>
                </a>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden justify-center lg:flex"
          >
            <motion.div
              animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              className="relative"
            >
              <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_70%)]" />
              <div className="absolute -inset-3 rounded-full border border-white/10" />
              <div className="absolute -inset-8 rounded-full border border-white/[0.05]" />
              <div className="relative h-72 w-72 overflow-hidden rounded-full border border-white/20 shadow-glass xl:h-80 xl:w-80">
                <ImageWithFallback
                  src="/images/optimized/profile_pic.webp"
                  alt={`Portrait of ${profile.name}`}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="glass-card absolute -bottom-5 -left-10 rounded-2xl px-4 py-3 shadow-glow">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.16em] opacity-60">
                  Stack
                </p>
                <p className="mt-1 text-sm font-semibold">Python · PyTorch · TensorFlow</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <button
        type="button"
        onClick={() =>
          document
            .getElementById('about')
            ?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
        }
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 z-10 flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full opacity-60 transition hover:opacity-100"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0-6-6m6 6 6-6" />
        </svg>
      </button>
    </section>
  );
}
