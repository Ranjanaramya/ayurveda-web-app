import React from 'react';
import { cn } from '../../lib/utils';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  fontSerif?: boolean;
}

export function Heading({
  className,
  level = 2,
  fontSerif = true,
  children,
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as any;
  return (
    <Tag
      className={cn(
        'text-neutral-900 dark:text-white leading-tight font-bold tracking-tight',
        {
          'font-serif': fontSerif,
          'font-sans': !fontSerif,
          'text-4xl sm:text-5xl lg:text-6xl': level === 1,
          'text-3xl sm:text-4xl': level === 2,
          'text-2xl sm:text-3xl': level === 3,
          'text-xl sm:text-2xl': level === 4,
          'text-lg sm:text-xl': level === 5,
          'text-base sm:text-lg': level === 6,
        },
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
