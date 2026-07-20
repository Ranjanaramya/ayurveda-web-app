import React from 'react';
import { Leaf } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoaderProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
}

export function Loader({ className, size = 'md', fullScreen = false }: LoaderProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  const content = (
    <div className={cn('flex flex-col items-center justify-center space-y-3', className)}>
      <div className="flex items-center justify-center rounded-xl bg-mint-100 dark:bg-mint-900/30 p-3 text-mint-600 dark:text-mint-400">
        <Leaf className={cn('animate-pulse', sizeClasses[size])} />
      </div>
      <span className="text-[10px] font-bold tracking-widest text-mint-700 dark:text-mint-300 uppercase">
        Restoring Balance...
      </span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-mint-50/90 dark:bg-neutral-950/90 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
}
