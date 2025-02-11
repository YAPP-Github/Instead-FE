// Dropdown.context.ts
import { createContext, useContext, useRef } from 'react';

export interface DropdownContextValue {
  value: string | string[];
  onValueChange?: (value: string) => void;
  placeholder?: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  // 추가: trigger의 DOM 노드를 참조하기 위한 ref
  triggerRef: React.RefObject<HTMLElement>;
}

export const DropdownContext = createContext<DropdownContextValue | null>(null);

export function useDropdownContext(): DropdownContextValue {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error(
      'Dropdown compound components must be used inside <Dropdown/>'
    );
  }
  return context;
}
