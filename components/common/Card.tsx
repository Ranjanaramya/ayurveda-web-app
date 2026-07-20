import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export function Card({ className, hoverEffect = true, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl bg-mint-100 dark:bg-neutral-950 border border-neutral-250/60 dark:border-neutral-800 shadow-sm p-6 overflow-hidden flex flex-col justify-between',
        {
          'hover:shadow-md hover:translate-y-[-2px] transition-all duration-300': hoverEffect,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
