import { ComponentPropsWithoutRef, forwardRef, ReactElement } from 'react';
import { addonRootStyle, buttonRecipe } from './Button.css';
import { Spinner, SpinnerProps } from '../Spinner';

export type ButtonSize = 'small' | 'large';
export type ButtonVariant = 'primary' | 'neutral' | 'text';

export type ButtonProps = {
  size: ButtonSize;
  variant: ButtonVariant;
  isLoading?: boolean;
  leftAddon?: ReactElement;
  rightAddon?: ReactElement;
} & ComponentPropsWithoutRef<'button'>;

const SpinnerColor: Record<ButtonVariant, SpinnerProps['color']> = {
  primary: 'white',
  neutral: 'white',
  text: 'black',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      variant = 'primary',
      isLoading = false,
      leftAddon,
      rightAddon,
      children,
      className = '',
      ...rest
    },
    ref
  ) => (
    <button
      ref={ref}
      className={`${buttonRecipe({ size, variant, isLoading })} ${className}`}
      {...rest}
    >
      {isLoading ? (
        <>
          <Spinner color={SpinnerColor[variant]} size={size} />
        </>
      ) : (
        <>
          {leftAddon && <div className={addonRootStyle[size]}>{leftAddon}</div>}
          {children}
          {rightAddon && (
            <div className={addonRootStyle[size]}>{rightAddon}</div>
          )}
        </>
      )}
    </button>
  )
);

Button.displayName = 'Button';
