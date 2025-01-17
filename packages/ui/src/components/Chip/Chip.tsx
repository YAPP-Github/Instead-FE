import { ComponentPropsWithoutRef, forwardRef, ReactElement } from 'react';
import { addonRootStyle, chipCloseButtonStyle, chipRecipe } from './Chip.css';
import { Icon } from '../Icon/Icon';

export type ButtonVariant = 'grey' | 'purple' | 'green';

export type ChipProps = ComponentPropsWithoutRef<'span'> & {
  variant: ButtonVariant;
  leftAddon?: ReactElement;
  rightAddon?: ReactElement;
  closable?: boolean;
};

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  ({
    className = '',
    variant,
    leftAddon,
    rightAddon,
    closable = false,
    children,
    ...rest
  }) => {
    return (
      <span className={`${chipRecipe({ variant })} ${className}`} {...rest}>
        {leftAddon && (
          <span className={addonRootStyle[variant]}>{leftAddon}</span>
        )}
        <span>{children}</span>
        {rightAddon && (
          <span className={addonRootStyle[variant]}>{rightAddon}</span>
        )}
        {closable && (
          <button
            type="button"
            aria-label="Close"
            className={chipCloseButtonStyle}
          >
            {/* TODO  color 600으로 수정 예정 */}
            <Icon name="x" size="1.6rem" type="stroke" color="violet800" />
          </button>
        )}
      </span>
    );
  }
);
