// Dropdown.context.ts
import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
} from 'react';

export interface DropdownContextValue {
  value: string | string[];
  onValueChange?: (value: string) => void;
  placeholder?: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  // 추가: trigger의 DOM 노드를 참조하기 위한 ref
  triggerRef: MutableRefObject<HTMLDivElement | null>;
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
