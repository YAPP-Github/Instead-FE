import { ComponentPropsWithoutRef, forwardRef, ReactElement } from 'react';
import { addonRootRecipe, chipCloseButtonStyle, chipRecipe } from './Chip.css';
import { Icon } from '../Icon/Icon';
import { Text } from '../Text/Text';

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
          <span className={addonRootRecipe({ color: variant })}>
            {leftAddon}
          </span>
        )}
        <Text fontSize={16} fontWeight="semibold">
          {children}
        </Text>
        {rightAddon && (
          <span className={addonRootRecipe({ color: variant })}>
            {rightAddon}
          </span>
        )}
        {closable && (
          <button
            type="button"
            aria-label="Close"
            className={chipCloseButtonStyle}
          >
            <Icon
              name="x"
              size="1.6rem"
              type="stroke"
              strokeWidth={'0.244rem'}
              color="purple600"
            />
          </button>
        )}
      </span>
    );
  }
);
