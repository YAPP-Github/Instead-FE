import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import * as styles from './Badge.css';

type BadgeCombination =
  | { size: 'medium'; variant: 'neautral'; shape: 'round' }
  | { size: 'medium'; variant: 'pink'; shape: 'square' }
  | { size: 'medium'; variant: 'primary'; shape: 'round' }
  | { size: 'medium'; variant: 'blue'; shape: 'square' }
  | { size: 'large'; variant: 'neautral'; shape: 'square' };

export type BadgeProps = HTMLAttributes<HTMLSpanElement> &
  BadgeCombination & {
    children: React.ReactNode;
  };

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ size, variant, shape, children, className = '', ...props }, ref) => (
    <span
      ref={ref}
      className={`${styles.badge({ size, variant, shape })} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';
