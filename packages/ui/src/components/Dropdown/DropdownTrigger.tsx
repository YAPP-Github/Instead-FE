'use client';
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { useDropdownContext } from './Dropdown.context';
import { dropdownTrigger } from './Dropdown.css';

export type DropdownTriggerProps = {
  children?: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export const DropdownTrigger = forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ children, className = '', ...props }, ref) => {
    const { setIsOpen, value, placeholder, triggerRef } = useDropdownContext();
    const handleClick = () => {
      setIsOpen((prev) => !prev);
    };

    return (
      <div
        ref={(node) => {
          if (typeof ref === 'function') {
            ref(node);
          } else if (ref) {
            (ref as any).current = node;
          }
          if (triggerRef) {
            (triggerRef as any).current = node;
          }
        }}
        className={`${className} ${dropdownTrigger}`}
        onClick={handleClick}
        {...props}
      >
        {children || value || placeholder || '옵션을 선택하세요.'}
      </div>
    );
  }
);

DropdownTrigger.displayName = 'Dropdown.Trigger';
