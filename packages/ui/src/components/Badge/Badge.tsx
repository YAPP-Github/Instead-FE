import { forwardRef } from 'react';
import type { HTMLAttributes } from 'react';
import * as styles from './Badge.css';

export type BadgeSize = 'medium' | 'large';
export type BadgeVariant = 'neautral' | 'primary' | 'pink' | 'blue';
export type BadgeShape = 'round' | 'square';

type BadgeCombination =
  | {
      size: Extract<BadgeSize, 'medium'>;
      variant: Extract<BadgeVariant, 'neautral'>;
      shape: Extract<BadgeShape, 'round'>;
    }
  | {
      size: Extract<BadgeSize, 'medium'>;
      variant: Extract<BadgeVariant, 'pink'>;
      shape: Extract<BadgeShape, 'square'>;
    }
  | {
      size: Extract<BadgeSize, 'medium'>;
      variant: Extract<BadgeVariant, 'primary'>;
      shape: Extract<BadgeShape, 'round'>;
    }
  | {
      size: Extract<BadgeSize, 'medium'>;
      variant: Extract<BadgeVariant, 'blue'>;
      shape: Extract<BadgeShape, 'square'>;
    }
  | {
      size: Extract<BadgeSize, 'large'>;
      variant: Extract<BadgeVariant, 'neautral'>;
      shape: Extract<BadgeShape, 'square'>;
    };

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
