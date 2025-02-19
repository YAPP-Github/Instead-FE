import { createContext, useContext, KeyboardEvent } from 'react';

type KeywordChipContextValue = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  isSelected?: (value: string) => boolean;
  itemValue?: string;
  itemsRef: HTMLButtonElement[];
  onKeyDown?: (
    event: KeyboardEvent<HTMLButtonElement>,
    currentIndex: number
  ) => void;
};

const KeywordChipContext = createContext<KeywordChipContextValue | undefined>(
  undefined
);

export const useKeywordChip = () => {
  const context = useContext(KeywordChipContext);
  if (!context) {
    throw new Error(
      'KeywordChip은 KeywordChipProvider 내부에서만 사용할 수 있습니다.'
    );
  }
  return context;
};

export const KeywordChipProvider = KeywordChipContext.Provider;
