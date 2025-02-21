'use client';
import {
  ComponentPropsWithoutRef,
  forwardRef,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useDropdownContext } from './Dropdown.context';
import {
  dropdownContent,
  dropdownContentAbove,
  dropdownContentLeft,
  dropdownContentRight,
} from './Dropdown.css';
import { mergeRefs } from '@repo/ui/utils';

export type DropdownContentProps = {
  children: ReactNode;
  align?: 'left' | 'right';
  position?: 'above' | 'below';
} & ComponentPropsWithoutRef<'div'>;

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  (
    { align = 'left', className = '', position = 'below', children, ...props },
    ref
  ) => {
    const { isOpen, triggerRef } = useDropdownContext();
    const contentRef = useRef<HTMLDivElement>(null);
    const [positionAbove, setPositionAbove] = useState(false);

    const contentClassName = `${dropdownContent} ${positionAbove ? dropdownContentAbove : ''} ${
      align === 'right' ? dropdownContentRight : dropdownContentLeft
    } ${className}`;

    useLayoutEffect(() => {
      function updatePosition() {
        if (isOpen && triggerRef.current && contentRef.current) {
          const triggerRect = triggerRef.current.getBoundingClientRect();
          const contentRect = contentRef.current.getBoundingClientRect();

          if (position === 'below') {
            if (triggerRect.bottom + contentRect.height > window.innerHeight) {
              setPositionAbove(true);
            } else {
              setPositionAbove(false);
            }
          } else if (position === 'above') {
            if (triggerRect.top - contentRect.height < 0) {
              setPositionAbove(false);
            } else {
              setPositionAbove(true);
            }
          }
        }
      }

      updatePosition();

      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);

      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }, [isOpen, triggerRef]);

    if (!isOpen) return null;

    return (
      <div
        ref={mergeRefs(ref, contentRef)}
        className={`${contentClassName}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownContent.displayName = 'Dropdown.Content';
