import { forwardRef, Fragment, isValidElement } from 'react';
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

// List of props to omit for Framer Motion
const OMIT_PROPS = [
  'form',
  'formAction',
  'formEncType',
  'formMethod',
  'formNoValidate',
  'formTarget',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onDragCapture',
  'onDragEndCapture',
  'onDragEnterCapture',
  'onDragExitCapture',
  'onDragLeaveCapture',
  'onDragOverCapture',
  'onDragStartCapture',
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
    const baseClasses =
      'btn relative inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none overflow-hidden';

    const variantClasses = {
      primary:
        'bg-gradient-to-r from-primary to-indigo-500 hover:from-primary-600 hover:to-indigo-600 text-white shadow-medium hover:shadow-hard',
      secondary:
        'bg-gradient-to-r from-secondary to-pink-500 hover:from-secondary-600 hover:to-pink-600 text-white shadow-medium hover:shadow-hard',
      outline:
        'border-2 border-primary/50 text-primary hover:bg-primary hover:text-white hover:border-primary shadow-soft hover:shadow-medium backdrop-blur-sm',
      ghost:
        'text-primary hover:bg-primary/10 hover:backdrop-blur-sm shadow-none hover:shadow-soft',
      glass:
        'glass-card text-gray-700 dark:text-gray-200 hover:text-primary shadow-glass hover:shadow-glass border-gradient',
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm min-h-[36px] min-w-[36px] rounded-lg',
      md: 'px-6 py-3 text-base min-h-[44px] min-w-[44px] rounded-xl',
      lg: 'px-8 py-4 text-lg min-h-[52px] min-w-[52px] rounded-2xl',
    };

    const glowClass = glow ? 'glow-primary' : '';
    const isDisabled = disabled || loading;
    const safeProps = filterProps(props);

    return (
      <motion.button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${glowClass} ${className}`}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02, y: -2, transition: { duration: 0.2 } } : {}}
        whileTap={!isDisabled ? { scale: 0.98, y: 0, transition: { duration: 0.1 } } : {}}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut',
        }}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...safeProps}
      >
        {/* Shimmer effect */}
        {!isDisabled && (
          <motion.div
            className="absolute inset-0 -top-1 -bottom-1 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
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
          <motion.span
            className="mr-2"
            aria-hidden="true"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {icon}
          </motion.span>
        )}

        <motion.span
          className={loading ? 'sr-only' : 'relative z-10'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {filterValidChildren(children)}
        </motion.span>

        {!loading && icon && iconPosition === 'right' && (
          <motion.span
            className="ml-2"
            aria-hidden="true"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {icon}
          </motion.span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
