'use client';
import { forwardRef } from 'react';
import { useDropdownContext } from './Dropdown.context';
import { Icon, IconProps } from '@repo/ui/Icon';
import { dropdownIcon } from './Dropdown.css';

export type DropdownIconProps = IconProps;

export const DropdownIcon = forwardRef<SVGSVGElement, DropdownIconProps>(
  (props, ref) => {
    const { isOpen } = useDropdownContext();

    return (
      <Icon
        ref={ref}
        {...props}
        className={`${props.className} ${dropdownIcon({ open: isOpen })}`}
      />
    );
  }
);

DropdownIcon.displayName = 'Dropdown.Icon';
