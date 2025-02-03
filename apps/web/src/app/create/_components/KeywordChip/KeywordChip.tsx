'use client';

import {
  ComponentPropsWithoutRef,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { KeywordChipRecipe } from './KeywordChip.css';
import { Text } from '@repo/ui';
import { useKeywordChip } from './context';
import { mergeRefs } from '@repo/ui/utils';

export type KeywordChipProps = ComponentPropsWithoutRef<'button'> & {
  value: string;
  disabled?: boolean;
};

export const KeywordChip = forwardRef<HTMLButtonElement, KeywordChipProps>(
  ({ className = '', children, value, disabled, ...rest }, ref) => {
    const {
      onChange,
      disabled: groupDisabled,
      isSelected,
      itemsRef,
      onKeyDown,
    } = useKeywordChip();
    const isDisabled = disabled || groupDisabled;
    const selected = isSelected?.(value) ?? false;
    const itemRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const currentRef = itemRef.current;
      if (currentRef) {
        itemsRef.push(currentRef);
        return () => {
          const index = itemsRef.indexOf(currentRef);
          if (index !== -1) itemsRef.splice(index, 1);
        };
      }
    }, [itemsRef]);

    const handleClick = useCallback(() => {
      if (!isDisabled) {
        onChange?.(value);
      }
    }, [isDisabled, onChange, value]);

    return (
      <button
        ref={mergeRefs(ref, itemRef)}
        className={`${KeywordChipRecipe({ isSelected: selected })} ${className}`}
        type="button"
        role="radio"
        aria-checked={selected}
        aria-disabled={isDisabled}
        tabIndex={isDisabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={(e) => {
          const currentIndex = itemsRef.indexOf(itemRef.current!);
          onKeyDown?.(e, currentIndex);
        }}
        {...rest}
      >
        <Text fontSize={18} fontWeight="bold">
          {children}
        </Text>
      </button>
    );
  }
);

KeywordChip.displayName = 'KeywordChip';
