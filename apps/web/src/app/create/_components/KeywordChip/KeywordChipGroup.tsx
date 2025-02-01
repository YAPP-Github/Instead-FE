'use client';

import { KeyboardEvent, ReactNode, useCallback, useState } from 'react';
import { KeywordChip } from './KeywordChip';
import { keywordChipGroupWrapper } from './KeywordChip.css';
import { KeywordChipProvider } from './context';

const KEYBOARD_KEY = {
  ARROW_RIGHT: 'ArrowRight',
  ARROW_LEFT: 'ArrowLeft',
} as const;

type KeywordChipGroupProps = {
  children: ReactNode[];
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
  name?: string;
};

export const KeywordChipGroup = ({
  children,
  onChange,
  defaultValue = '',
  disabled = false,
  name = 'keyword-group',
}: KeywordChipGroupProps) => {
  const [value, setValue] = useState(defaultValue);
  const [itemsRef] = useState<HTMLButtonElement[]>([]);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      onChange?.(newValue);
    },
    [onChange]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
      const items = itemsRef;
      let nextIndex: number;

      switch (event.key) {
        case KEYBOARD_KEY.ARROW_RIGHT:
          event.preventDefault();
          nextIndex = (currentIndex + 1) % items.length;
          break;
        case KEYBOARD_KEY.ARROW_LEFT:
          event.preventDefault();
          nextIndex = (currentIndex - 1 + items.length) % items.length;
          break;
        default:
          return;
      }

      items[nextIndex]?.focus();
    },
    [itemsRef]
  );

  const isSelected = useCallback(
    (itemValue: string) => itemValue === value,
    [value]
  );

  return (
    <KeywordChipProvider
      value={{
        value,
        onChange: handleChange,
        disabled,
        isSelected,
        itemsRef,
        onKeyDown: handleKeyDown,
      }}
    >
      <div
        className={keywordChipGroupWrapper}
        role="radiogroup"
        aria-label={name}
      >
        {children.map((child) => (
          <KeywordChip key={child?.toString()} value={child?.toString() ?? ''}>
            {child}
          </KeywordChip>
        ))}
      </div>
    </KeywordChipProvider>
  );
};
