import { Link, type LinkProps } from 'react-router-dom';

/**
 * A link that looks like the primary Button but renders a real <a>, so it stays
 * keyboard-accessible, openable in a new tab, and free of invalid <a><button> nesting.
 */
export default function LinkButton({
  children,
  className = '',
  ...props
}: LinkProps): React.ReactElement {
  return (
    <Link
      {...props}
      className={`relative inline-flex min-h-[44px] items-center justify-center rounded-2xl border border-white/20 bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#8B5CF6] px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all duration-300 hover:border-white/40 hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/40 ${className}`}
    >
      {children}
    </Link>
  );
}
