import { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react';
import { addonRootStyle, buttonRecipe } from './Button.css';

export type ButtonSize = 'small' | 'large';
export type ButtonVariant = 'primary' | 'neutral' | 'terminal';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: ButtonSize;
  variant: ButtonVariant;
  leftAddon?: ReactElement;
  rightAddon?: ReactElement;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { size, variant, leftAddon, rightAddon, children, className = '', ...rest },
    ref
  ) => (
    <button
      ref={ref}
      className={`${buttonRecipe({ size, variant })} ${className}`}
      {...rest}
    >
      {leftAddon && <div className={addonRootStyle[size]}>{leftAddon}</div>}
      {children}
      {rightAddon && <div className={addonRootStyle[size]}>{rightAddon}</div>}
    </button>
  )
);

Button.displayName = 'Button';
