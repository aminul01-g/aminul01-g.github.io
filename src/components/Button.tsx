import { forwardRef, Fragment, isValidElement } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
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
      ...props
    },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none';

    const variantClasses = {
      primary:
        'bg-gradient-to-r from-primary to-indigo-500 hover:from-primary-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
      secondary:
        'bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
      outline:
        'border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
      ghost: 'text-primary hover:bg-primary/10 hover:scale-105 active:scale-95',
    };

    const sizeClasses = {
      sm: 'px-4 py-2 text-sm min-h-[36px] min-w-[36px]',
      md: 'px-6 py-3 text-base min-h-[44px] min-w-[44px]',
      lg: 'px-8 py-4 text-lg min-h-[52px] min-w-[52px]',
    };

    const isDisabled = disabled || loading;
    const safeProps = filterProps(props);

    return (
      <motion.button
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        disabled={isDisabled}
        whileHover={!isDisabled ? { scale: 1.02 } : {}}
        whileTap={!isDisabled ? { scale: 0.98 } : {}}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...safeProps}
      >
        {loading && (
          <motion.div
            className="mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            aria-hidden="true"
          />
        )}

        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2" aria-hidden="true">
            {icon}
          </span>
        )}

        <span className={loading ? 'sr-only' : ''}>{filterValidChildren(children)}</span>

        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2" aria-hidden="true">
            {icon}
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
