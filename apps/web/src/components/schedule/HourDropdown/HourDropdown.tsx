'use client';

import { Dropdown } from '@repo/ui';
import * as styles from './HourDropdown.css';

type HourDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

const hours = Array.from({ length: 24 }, (_, i) =>
  i.toString().padStart(2, '0')
);

export function HourDropdown({ value = '00', onChange }: HourDropdownProps) {
  return (
    <Dropdown value={value} onValueChange={onChange}>
      <Dropdown.Trigger className={styles.trigger}>{value}시</Dropdown.Trigger>
      <Dropdown.Content>
        {hours.map((hour) => (
          <Dropdown.Item key={hour} value={hour}>
            {hour}시
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
