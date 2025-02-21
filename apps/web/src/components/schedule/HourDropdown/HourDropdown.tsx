'use client';

import { Dropdown } from '@repo/ui';
import * as styles from './HourDropdown.css';

type HourDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

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

const hours = [
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
];
