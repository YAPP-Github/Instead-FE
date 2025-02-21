import { ComponentPropsWithoutRef, forwardRef, ReactElement } from 'react';
import { chipCloseButtonRecipe, chipRecipe } from './Chip.css';
import { Icon } from '../Icon/Icon';
import { isNotNil } from '../../utils';

export type ButtonVariant = 'grey' | 'purple' | 'orange';

export type ChipProps = ComponentPropsWithoutRef<'span'> & {
  variant: ButtonVariant;
  leftAddon?: ReactElement;
  rightAddon?: ReactElement;
  closable?: boolean;
  onClose?: () => void;
};

export const ChipItem = forwardRef<HTMLSpanElement, ChipProps>(
  ({
    className = '',
    variant,
    leftAddon,
    rightAddon,
    closable = false,
    children,
    onClose,
    ...rest
  }) => {
    return (
      <span className={`${chipRecipe({ variant })} ${className}`} {...rest}>
        {isNotNil(leftAddon) && leftAddon}
        {children}
        {isNotNil(rightAddon) && rightAddon}
        {closable && (
          <button
            type="button"
            aria-label="Close"
            className={chipCloseButtonRecipe({ clickable: closable })}
            onClick={onClose}
          >
            <Icon
              name="x"
              size="1.6rem"
              type="stroke"
              strokeWidth={'0.244rem'}
              color={`${variant}400`}
            />
          </button>
        )}
      </span>
    );
  }
);
