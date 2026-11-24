interface TechMarqueeProps {
  items: string[];
}

/** A quiet, continuously scrolling technology strip — one signature motion element. */
export default function TechMarquee({ items }: TechMarqueeProps): React.ReactElement {
  const row = [...items, ...items];
  return (
    <div
      className="relative z-10 overflow-hidden border-y border-[var(--hairline)] bg-[var(--surface)] py-4"
      aria-label={`Technologies: ${items.join(', ')}`}
    >
      <div className="marquee-track flex w-max gap-10 whitespace-nowrap px-5">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[var(--muted)]"
            aria-hidden="true"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
