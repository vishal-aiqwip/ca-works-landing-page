import React, { JSX } from 'react';

import { cn } from '@/lib';

interface Props {
  children: React.ReactNode;
  className?: string;
}

/**
 * @file divider.jsx
 * @description Divider component
 */
export const Divider = ({ children, className }: Props): JSX.Element => {
  return (
    <div
      className={cn(
        'after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t',
        className
      )}
    >
      <span className="bg-background text-muted-foreground relative z-10 px-2">{children}</span>
    </div>
  );
};
