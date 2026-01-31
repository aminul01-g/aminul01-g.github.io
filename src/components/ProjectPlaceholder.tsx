import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface ProjectPlaceholderProps {
  title: string;
  className?: string;
}

export default function ProjectPlaceholder({
  title,
  className = '',
}: ProjectPlaceholderProps): React.ReactElement {
  // Generate consistent "random" values based on title string
  const hash = useMemo(() => {
    let h = 0;
    for (let i = 0; i < title.length; i++) {
      h = Math.imul(31, h) + title.charCodeAt(i) || 0;
    }
    return Math.abs(h);
  }, [title]);

  const hue = hash % 360;
  const pattern = hash % 4; // 0: dots, 1: lines, 2: grid, 3: circles

  const gradientStart = `hsl(${hue}, 70%, 60%)`;
  const gradientEnd = `hsl(${(hue + 40) % 360}, 70%, 40%)`;

  return (
    <div
      className={`relative overflow-hidden bg-gray-900 flex items-center justify-center ${className}`}
      style={{
        background: `linear-gradient(135deg, ${gradientStart}, ${gradientEnd})`,
      }}
    >
      {/* Abstract Patterns Overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <pattern
          id={`pattern-${hash}`}
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {pattern === 0 && <circle cx="2" cy="2" r="2" fill="white" />}
          {pattern === 1 && (
            <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" strokeWidth="2" />
          )}
          {pattern === 2 && <path d="M40 0H0V40" stroke="white" strokeWidth="2" fill="none" />}
          {pattern === 3 && <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="2" fill="none" />}
        </pattern>
        <rect width="100%" height="100%" fill={`url(#pattern-${hash})`} />
      </svg>

      {/* Code Snippet / Title Overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-white text-center p-4 bg-black/30 backdrop-blur-sm rounded-xl border border-white/20"
      >
        <div className="text-4xl mb-2 font-mono">{title.charAt(0).toUpperCase()}</div>
        <div className="text-xs font-mono opacity-80">&lt;Code /&gt;</div>
      </motion.div>
    </div>
  );
}
