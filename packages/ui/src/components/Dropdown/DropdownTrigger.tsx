'use client';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEvent,
  ReactNode,
} from 'react';
import { useDropdownContext } from './Dropdown.context';
import { dropdownTrigger } from './Dropdown.css';
import { mergeRefs } from '@repo/ui/utils';

export type DropdownTriggerProps = {
  children?: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export const DropdownTrigger = forwardRef<HTMLDivElement, DropdownTriggerProps>(
  ({ children, className = '', ...props }, ref) => {
    const { setIsOpen, value, placeholder, triggerRef } = useDropdownContext();

    const handleClick = (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setIsOpen((prev) => !prev);
    };

    return (
      <div
        ref={mergeRefs(ref, triggerRef)}
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
