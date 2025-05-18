'use client';

import { Dropdown } from '@repo/ui';
import { DropdownTriggerWithArrow } from '../DropdownTriggerWithArrow/DropdownTriggerWithArrow';

type HourDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function HourDropdown({ value = '12', onChange }: HourDropdownProps) {
  return (
    <Dropdown value={value} onValueChange={onChange}>
      <DropdownTriggerWithArrow>{value}시</DropdownTriggerWithArrow>
      <Dropdown.Content>
        {HOURS.map((hour) => (
          <Dropdown.Item key={hour} value={hour}>
            {hour}시
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}

const HOURS = [
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
] as const;
