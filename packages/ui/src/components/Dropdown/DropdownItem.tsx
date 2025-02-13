'use client';

import { ComponentPropsWithoutRef, forwardRef, MouseEvent } from 'react';
import { useDropdownContext } from './Dropdown.context';
import { dropdownItem } from './Dropdown.css';

export type DropdownItemProps = {
  /** select 모드에서 사용 시, 아이템의 고유 값 */
  value?: string;
  /**
   * 클릭 시 실행할 콜백 (선택 이벤트)
   */
  onClick?: (event: MouseEvent<HTMLDivElement, MouseEvent>) => void;
} & ComponentPropsWithoutRef<'div'>;

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ className = '', value, children, onClick, ...props }, ref) => {
    const context = useDropdownContext();

    const handleClick = (event: MouseEvent<HTMLDivElement>) => {
      if (onClick) onClick(event);
      if (context && value !== undefined) {
        context.onValueChange?.(value);
        // 아이템 클릭 시 드롭다운 닫기
        context.setIsOpen(false);
      }
    };

    return (
      <div
        ref={ref}
        className={`${className} ${dropdownItem}`}
        role="menuitem"
        tabIndex={0}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    );
  }
);

DropdownItem.displayName = 'Dropdown.Item';
