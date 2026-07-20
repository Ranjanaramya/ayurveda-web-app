import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', fullWidth = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          {
            'bg-mint-600 hover:bg-mint-700 text-white shadow-md dark:bg-mint-500 dark:hover:bg-mint-400 hover:-translate-y-[1px]':
              variant === 'primary',
            'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-neutral-100':
              variant === 'secondary',
            'border border-neutral-300 dark:border-neutral-750 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 text-neutral-800 dark:text-neutral-200':
              variant === 'outline',
            'bg-transparent hover:bg-neutral-105 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200':
              variant === 'ghost',
            'px-4 py-2 text-xs': size === 'sm',
            'px-6 py-3 text-sm': size === 'md',
            'px-8 py-4 text-base': size === 'lg',
            'w-full': fullWidth,
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
