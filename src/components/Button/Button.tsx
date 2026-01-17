import { JSX } from 'preact';
import { forwardRef } from 'preact/compat';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: preact.ComponentChildren;
  iconLeft?: boolean;
  iconRight?: boolean;
}

// Chevron Icon Component
function ChevronIcon({ size = 'md', className = '' }: { size?: 'sm' | 'md'; className?: string }) {
  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  return (
    <svg
      className={`${iconSize} ${className}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      strokeWidth={1.6}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    iconLeft = false,
    iconRight = false,
    className = '', 
    children, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed rounded-[120px]';
    
    // Size classes - matching Figma: md = h-12 p-4, sm = px-4 py-3
    const sizeClasses = {
      sm: 'px-4 py-3 text-sm leading-4',
      md: 'h-12 p-4 text-base leading-4',
    };
    
    // Variant classes with proper hover and disabled states
    const variantClasses = {
      primary: disabled
        ? 'bg-surface-disabled-dark text-text-action-disabled opacity-40'
        : 'bg-surface-action-primary text-text-action-on-primary hover:bg-surface-action-hover-primary hover:text-text-action-inverse',
      secondary: disabled
        ? 'bg-surface-disabled-dark text-text-action-disabled opacity-40'
        : 'bg-surface-action-secondary text-text-action-on-secondary hover:bg-surface-action-hover-secondary hover:text-text-action-on-primary',
      tertiary: disabled
        ? 'bg-white border border-border-disabled/20 text-text-action-disabled opacity-40'
        : 'bg-white border-[1.5px] border-border-primary text-text-action-on-tertiary hover:bg-surface-action-hover-primary hover:text-text-action-inverse hover:border-transparent',
    };
    
    // Icon color classes based on variant and state
    const getIconColor = () => {
      if (disabled) {
        return 'text-icon-action-disabled opacity-20';
      }
      if (variant === 'primary') {
        return 'text-icon-action-on-primary group-hover:text-icon-action-inverse';
      }
      if (variant === 'secondary') {
        return 'text-icon-action-on-secondary group-hover:text-icon-action-on-primary';
      }
      // tertiary
      return 'text-icon-action-active group-hover:text-icon-action-inverse';
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    const iconColor = getIconColor();
    
    return (
      <button
        ref={ref}
        className={`${classes} group`}
        disabled={disabled}
        {...props}
      >
        {iconLeft && (
          <span className={`px-2 flex items-center ${iconColor}`}>
            <ChevronIcon size={size} />
          </span>
        )}
        <span className="px-2 flex items-center">
          {children}
        </span>
        {iconRight && (
          <span className={`px-2 flex items-center ${iconColor}`}>
            <ChevronIcon size={size} />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
