import { Button, ButtonProps } from '../Button';
import { forwardRef } from 'react';
import * as style from './FixedBottomCTA.css';

export type FixedBottomCTAProps = {
  withBackground?: boolean;
} & Omit<ButtonProps, 'size' | 'variant'> &
  Partial<Pick<ButtonProps, 'size' | 'variant'>>;

export const FixedBottomCTA = forwardRef<
  HTMLButtonElement,
  FixedBottomCTAProps
>(
  (
    {
      withBackground = true,
      size = 'large',
      variant = 'primary',
      className = '',
      ...restProps
    },
    ref
  ) => {
    return (
      <div
        className={
          withBackground ? `${style.backgroundStyle} ${className}` : className
        }
      >
        <Button ref={ref} size={size} variant={variant} {...restProps} />
      </div>
    );
  }
);
