import { forwardRef, Fragment, isValidElement, useState } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  glow?: boolean;
}

function filterValidChildren(children: React.ReactNode): React.ReactNode {
  if (Array.isArray(children)) {
    return (
      <Fragment>
        {children.filter(
          (child) => typeof child === 'string' || typeof child === 'number' || isValidElement(child)
        )}
      </Fragment>
    );
  }
  if (typeof children === 'string' || typeof children === 'number' || isValidElement(children)) {
    return children;
  }
  return null;
}

const OMIT_PROPS = [
  'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget',
  'onDrag', 'onDragEnd', 'onDragEnter', 'onDragExit', 'onDragLeave', 'onDragOver',
  'onDragStart', 'onDrop', 'onDragCapture', 'onDragEndCapture', 'onDragEnterCapture',
  'onDragExitCapture', 'onDragLeaveCapture', 'onDragOverCapture', 'onDragStartCapture',
  'onDropCapture',
];

function filterProps(props: Record<string, unknown>) {
  const filtered: Record<string, unknown> = {};
  Object.keys(props).forEach((key) => {
    if (!OMIT_PROPS.includes(key)) {
      filtered[key] = props[key];
    }
  });
  return filtered;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      iconPosition = 'left',
      disabled,
      glow = false,
      ...props
    },
    ref
  ) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
      if (props.onClick) props.onClick(e);
    };

    const baseClasses =
      'relative inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-40 disabled:cursor-not-allowed overflow-hidden cursor-pointer';

    /* ===== REFRACTIVE GLASS BUTTON VARIANTS ===== */
    const variantClasses = {
      primary:
        'bg-gradient-to-r from-[#4F46E5] via-[#7C3AED] to-[#8B5CF6] text-white border border-white/20 shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_40px_rgba(124,58,237,0.6),0_0_80px_rgba(124,58,237,0.2)] hover:border-white/40',
      secondary:
        'bg-gradient-to-r from-[#EC4899] via-[#DB2777] to-[#BE185D] text-white border border-white/20 shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_40px_rgba(236,72,153,0.5)]',
      outline:
        'bg-transparent border border-white/20 text-white/90 backdrop-blur-xl hover:bg-white/[0.06] hover:border-white/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]',
      ghost:
        'bg-transparent text-white/80 hover:bg-white/[0.06] hover:text-white border border-transparent hover:border-white/10',
      glass:
        'bg-white/[0.03] backdrop-blur-2xl border border-white/12 text-white/90 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:bg-white/[0.06] hover:border-white/25 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_20px_rgba(139,92,246,0.1)]',
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm min-h-[36px]',
      md: 'px-6 py-3 text-base min-h-[44px]',
      lg: 'px-8 py-4 text-lg min-h-[52px]',
    };

    const isDisabled = disabled || loading;
    const safeProps = filterProps(props);

    return (
      <motion.button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${glow ? 'animate-pulse' : ''} ${className}`}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.03, y: -3, transition: { type: 'spring', stiffness: 400, damping: 15 } } : {}}
        whileTap={!isDisabled ? { scale: 0.97, y: 0, transition: { duration: 0.1 } } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...safeProps}
        onClick={handleClick}
      >
        {/* Refractive shimmer sweep */}
        {!isDisabled && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none"
            initial={{ x: '-200%' }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        )}

        {loading && (
          <motion.div
            className="mr-2 w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          />
        )}

        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2" aria-hidden="true">{icon}</span>
        )}

        <span className={loading ? 'sr-only' : 'relative z-10'}>
          {filterValidChildren(children)}
        </span>

        {/* Liquid Ripples */}
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none bg-white/30"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              transform: 'translate(-50%, -50%)',
              animation: 'ripple 0.6s linear',
            }}
          />
        ))}

        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2" aria-hidden="true">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
