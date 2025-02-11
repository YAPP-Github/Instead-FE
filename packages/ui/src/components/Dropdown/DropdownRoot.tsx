'use client';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  useState,
  useRef,
} from 'react';
import { DropdownContext, DropdownContextValue } from './Dropdown.context';
import { dropdownRoot } from './Dropdown.css';

export type DropdownProps = {
  value?: string;
  onValueChange?: (newValue: string) => void;
  placeholder?: React.ReactNode;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export const DropdownRoot = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      className = '',
      value,
      onValueChange,
      placeholder,
      children,
      ...props
    }: DropdownProps,
    ref
  ) => {
    const isSelectMode =
      typeof value !== 'undefined' && typeof onValueChange === 'function';
    const [isOpen, setIsOpen] = useState(false);

    const triggerRef = useRef<HTMLElement>(null);

    const contextValue: DropdownContextValue = isSelectMode
      ? {
          value: value!,
          onValueChange: onValueChange!,
          placeholder,
          isOpen,
          setIsOpen,
          triggerRef,
        }
      : { value: '', isOpen, setIsOpen, triggerRef };

    return (
      <DropdownContext.Provider value={contextValue}>
        <div ref={ref} className={`${dropdownRoot} ${className}`} {...props}>
          {children}
        </div>
      </DropdownContext.Provider>
    );
  }
);

DropdownRoot.displayName = 'DropdownRoot';
