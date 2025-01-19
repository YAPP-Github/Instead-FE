import {
  forwardRef,
  useCallback,
  MouseEvent,
  KeyboardEvent,
  ReactNode,
  ComponentPropsWithoutRef,
  useEffect,
  useRef,
} from 'react';
import { useRadioCards } from './context';
import { radioCardsContentStyle, radioCardsItemStyle } from './RadioCards.css';
import { RadioCardsItemProvider } from './context';
import { HTMLMotionProps, motion } from 'motion/react';
import { usePress } from '@/hooks/usePress';
import { mergeRefs } from '@/utils/mergeRefs';

export type RadioCardsItemProps = {
  value: string;
  disabled?: boolean;
  leftAddon?: ReactNode;
  children?: ReactNode;
} & HTMLMotionProps<'div'> &
  Omit<ComponentPropsWithoutRef<'div'>, 'value'>;

export const RadioCardsItem = forwardRef<HTMLDivElement, RadioCardsItemProps>(
  (
    { children, value, disabled, className = '', onClick, leftAddon, ...props },
    ref
  ) => {
    const { pressed, pressHandlers } = usePress();
    const {
      value: selectedValue,
      onChange,
      disabled: groupDisabled,
      itemsRef,
      onKeyDown,
    } = useRadioCards();
    const isDisabled = disabled || groupDisabled;
    const isSelected = value === selectedValue;
    const itemRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(
      (event: MouseEvent<HTMLDivElement>) => {
        if (!isDisabled) {
          onClick?.(event);
          onChange?.(value);
        }
      },
      [isDisabled, onClick, onChange, value]
    );

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (isDisabled) return;

        if (event.key === ' ' || event.key === 'Enter') {
          event.preventDefault();
          onChange?.(value);
          return;
        }

        if (/^Arrow/.test(event.key)) {
          const currentIndex = itemsRef.findIndex(
            (item) => item === itemRef.current
          );
          onKeyDown?.(event, currentIndex);
        }
      },
      [isDisabled, onChange, value, itemsRef, onKeyDown]
    );

    const refs = itemsRef;
    useEffect(() => {
      if (itemRef.current && !isDisabled) {
        refs.push(itemRef.current);
        return () => {
          const index = refs.indexOf(itemRef.current!);
          if (index > -1) refs.splice(index, 1);
        };
      }
    }, [itemsRef, isDisabled]);

    return (
      <RadioCardsItemProvider
        value={{
          isSelected: !!isSelected,
          isDisabled: !!isDisabled,
          value,
        }}
      >
        <motion.div
          ref={mergeRefs(ref, itemRef)}
          role="radio"
          data-value={value}
          aria-checked={isSelected}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : 0}
          className={`${radioCardsItemStyle({ selected: isSelected, disabled: isDisabled })} ${className}`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
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
          {leftAddon}
          <div className={radioCardsContentStyle}>{children}</div>
        </motion.div>
      </RadioCardsItemProvider>
    );
  }
);

RadioCardsItem.displayName = 'RadioCards.Item';
