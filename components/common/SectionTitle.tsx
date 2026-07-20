import React from 'react';
import { Heading } from './Heading';
import { cn } from '../../lib/utils';

interface SectionTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  tag?: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export function SectionTitle({
  className,
  tag,
  title,
  description,
  centered = true,
  ...props
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'max-w-3xl space-y-3',
        {
          'text-center mx-auto': centered,
          'text-left': !centered,
        },
        className
      )}
      {...props}
    >
      {tag && (
        <span className="text-xs font-bold text-mint-600 dark:text-mint-400 uppercase tracking-widest block">
          {tag}
        </span>
      )}
      <Heading level={2}>{title}</Heading>
      {description && (
        <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
