import LinkButton from '../components/LinkButton';

const NotFound: React.FC = () => (
  <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center relative z-10">
    <div className="mb-8 flex w-full max-w-lg items-center gap-4">
      <span className="font-mono text-xs text-[var(--accent-2)]">00</span>
      <span className="h-px flex-1 bg-[var(--hairline)]" aria-hidden="true" />
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-[var(--muted)]">
        Error
      </span>
    </div>
    <h1 className="text-[clamp(4rem,14vw,9rem)] font-bold leading-none tracking-[-0.06em] text-[var(--ink)]">
      404
    </h1>
    <h2 className="mt-6 text-2xl font-semibold text-[var(--ink)]">Page not found.</h2>
    <p className="mt-3 max-w-md text-[var(--muted)]">
      That route doesn’t exist. The homepage is still here.
    </p>
    <div className="mt-8">
      <LinkButton to="/">Back to homepage</LinkButton>
    </div>
  </div>
);

export default NotFound;
