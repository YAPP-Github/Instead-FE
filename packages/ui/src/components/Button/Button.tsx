import { ComponentPropsWithoutRef, forwardRef, ReactElement } from 'react';
import {
  addonRootStyle,
  buttonChildrenRecipe,
  buttonRecipe,
  spinner,
} from './Button.css';
import { Spinner, SpinnerProps } from '../Spinner';
import { LineButtonAnimate } from './LineButtonAnimate';

export type ButtonSize = 'small' | 'large';
export type ButtonVariant = 'primary' | 'neutral' | 'text' | 'line';

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
  line: 'line',
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
  ) => {
    const content = (
      <button
        ref={ref}
        className={`${buttonRecipe({ size, variant, isLoading })} ${className}`}
        {...rest}
      >
        {isLoading && (
          <Spinner
            className={spinner({ size, isLoading })}
            color={SpinnerColor[variant]}
            size={size}
          />
        )}
        <div className={`${buttonChildrenRecipe({ size, isLoading })}`}>
          {leftAddon && <div className={addonRootStyle[size]}>{leftAddon}</div>}
          {children}
          {rightAddon && (
            <div className={addonRootStyle[size]}>{rightAddon}</div>
          )}
        </div>
      </button>
    );

    if (variant === 'line') {
      return <LineButtonAnimate size={size}>{content}</LineButtonAnimate>;
    }
    return <>{content}</>;
  }
);

Button.displayName = 'Button';
