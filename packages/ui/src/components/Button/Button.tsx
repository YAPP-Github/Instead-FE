import { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react';
import { addonRootStyle, buttonRecipe } from './Button.css';

export type ButtonSize = 'small' | 'large';
export type ButtonVariant = 'primary' | 'neutral' | 'terminal';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: ButtonSize;
  variant: ButtonVariant;
  isLoading?: boolean;
  leftAddon?: ReactElement;
  rightAddon?: ReactElement;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size,
      variant,
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
      className={`${buttonRecipe({ size, variant })} ${className}`}
      {...rest}
    >
      {isLoading ? (
        <>
          // TODO Spinner 컴포넌트 넣을 예정
          <span>로딩</span>
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
