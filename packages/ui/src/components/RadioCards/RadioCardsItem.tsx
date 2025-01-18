import { forwardRef, useCallback, KeyboardEvent, MouseEvent } from 'react';
import { useRadioCards } from './context';
import { radioCardsItemStyle } from './RadioCards.css';
import { RadioCardsItemProvider } from './context';
import { motion, HTMLMotionProps } from 'motion/react';
import { usePress } from '@/hooks/usePress';

export type RadioCardsItemProps = {
  value: string;
  disabled?: boolean;
} & Omit<HTMLMotionProps<'div'>, 'value'>;

export const RadioCardsItem = forwardRef<HTMLDivElement, RadioCardsItemProps>(
  ({ children, value, disabled, className = '', onClick, ...props }, ref) => {
    const { pressed, pressHandlers } = usePress();
    const {
      value: selectedValue,
      onChange,
      disabled: groupDisabled,
    } = useRadioCards();
    const isDisabled = disabled || groupDisabled;
    const isSelected = value === selectedValue;

    const handleClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        if (!isDisabled) {
          onClick?.(event);
          onChange?.(value);
        }
      },
      [isDisabled, onClick, onChange, value]
    );

    return (
      <RadioCardsItemProvider
        value={{
          isSelected: !!isSelected,
          isDisabled: !!isDisabled,
          value,
        }}
      >
        <motion.div
          ref={ref}
          role="radio"
          aria-checked={isSelected}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          className={`${radioCardsItemStyle({ selected: isSelected, disabled: isDisabled })} ${className}`}
          onClick={handleClick}
          onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              if (!isDisabled) {
                onChange?.(value);
              }
            }
          }}
          {...(!isDisabled && pressHandlers)}
          initial={false}
          animate={{
            scale: pressed && !isDisabled ? 0.97 : 1,
            opacity: pressed && !isDisabled ? 0.7 : 1,
          }}
          transition={{
            scale: {
              type: 'spring',
              stiffness: 400,
              damping: 25,
              mass: 0.5,
            },
            opacity: {
              duration: 0.1,
            },
          }}
          {...props}
        >
          {children}
        </motion.div>
      </RadioCardsItemProvider>
    );
  }
);

RadioCardsItem.displayName = 'RadioCards.Item';
