'use client';

import { Dropdown } from '@repo/ui';
import * as styles from './CountDropdown.css';
import { IconButton } from '@repo/ui';

type CountDropdownProps = {
  value?: string;
  onChange: (value: string) => void;
};

const counts = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
export function CountDropdown({ value = '1', onChange }: CountDropdownProps) {
  return (
    <Dropdown value={value} onValueChange={onChange}>
      <Dropdown.Trigger className={styles.triggerStyle}>
        {value}개
        <IconButton icon="arrowBottom" color="grey300" />
      </Dropdown.Trigger>
      <Dropdown.Content className={styles.contentStyle}>
        {counts.map((count) => (
          <Dropdown.Item key={count} value={count}>
            {count}개
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
