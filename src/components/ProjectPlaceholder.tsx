import React from 'react';

interface ProjectPlaceholderProps {
  title: string;
  className?: string;
}

/**
 * Neutral editorial cover for projects without a real screenshot.
 * Deliberately monochrome so it reads as a placeholder, not as product imagery.
 */
export default function ProjectPlaceholder({
  title,
  className = '',
}: ProjectPlaceholderProps): React.ReactElement {
  const initial = title.trim().charAt(0).toUpperCase() || '·';

  return (
    <div
      className={`relative flex h-full w-full items-center justify-center overflow-hidden bg-[#111319] ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(148,163,184,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.10) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className="relative z-10 flex flex-col items-center gap-2">
        <span className="font-mono text-5xl font-bold text-[var(--muted)] opacity-60">
          {initial}
        </span>
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.24em] text-[var(--muted)] opacity-50">
          Case study
        </span>
      </div>
    </div>
  );
}
