import { Dropdown, Icon } from '@repo/ui';
import { ReactNode } from 'react';
import * as styles from './DropdownTriggerWithArrow.css';

type DropdownTriggerWithArrowProps = {
  children: ReactNode;
};

export function DropdownTriggerWithArrow({
  children,
}: DropdownTriggerWithArrowProps) {
  return (
    <Dropdown.Trigger className={styles.triggerStyle}>
      {children}
      <Icon
        name="arrowBottom"
        color="grey300"
        size={20}
        className={styles.iconStyle}
      />
    </Dropdown.Trigger>
  );
}
