import { createContext, useContext, KeyboardEvent } from 'react';

type RadioCardsContextValue = {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  isSelected?: (value: string) => boolean;
  itemValue?: string;
  itemsRef: HTMLDivElement[];
  onKeyDown?: (
    event: KeyboardEvent<HTMLDivElement>,
    currentIndex: number
  ) => void;
};

const RadioCardsContext = createContext<RadioCardsContextValue | undefined>(
  undefined
);

export const useRadioCards = () => {
  const context = useContext(RadioCardsContext);
  if (!context) {
    throw new Error('RadioCards 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

export const RadioCardsItemContext = createContext<{
  isSelected: boolean;
  isDisabled: boolean;
  value: string;
} | null>(null);

export const useRadioCardsItem = () => {
  const context = useContext(RadioCardsItemContext);
  if (!context) {
    throw new Error('RadioCards.Item 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

export const RadioCardsProvider = RadioCardsContext.Provider;
export const RadioCardsItemProvider = RadioCardsItemContext.Provider;
