import { ButtonHTMLAttributes, forwardRef } from 'react';
import { buttonRecipe } from './Button.css';
import { Icon, IconName } from '../Icon/Icon';

export type ButtonSize = 'small' | 'large';
export type ButtonVariant = 'primary' | 'neutral' | 'terminal';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: ButtonSize;
  variant: ButtonVariant;
  leftIcon?: IconName;
  rightIcon?: IconName;
};

const iconSize: Record<ButtonSize, string> = {
  small: '2.4rem',
  large: '1.6rem',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { size, variant, leftIcon, rightIcon, children, className = '', ...rest },
    ref
  ) => (
    <button
      ref={ref}
      className={`${buttonRecipe({ size, variant })} ${className}`}
      {...rest}
    >
      {leftIcon && <Icon name={leftIcon} size={iconSize[size]} />}
      {children}
      {rightIcon && <Icon name={rightIcon} size={iconSize[size]} />}
    </button>
  )
);

Button.displayName = 'Button';
