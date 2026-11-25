interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

/** Numbered editorial section header — the signature of the new design system. */
export default function SectionHeading({
  index,
  label,
  title,
  description,
}: SectionHeadingProps): React.ReactElement {
  return (
    <header className="mb-12 md:mb-16">
      <div className="mb-6 flex items-center gap-4">
        <span className="font-mono text-xs text-[var(--accent-2)]">{index}</span>
        <span className="section-rule flex-1" aria-hidden="true" />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted)]">
          {label}
        </span>
      </div>
      <h2 className="max-w-4xl text-[clamp(2.2rem,5.5vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.05em] text-[var(--ink)]">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
