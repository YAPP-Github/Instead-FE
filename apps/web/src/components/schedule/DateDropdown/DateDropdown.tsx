'use client';

import { Dropdown } from '@repo/ui';
import { DayPicker } from 'react-day-picker';
import './dayPicker.css';

type DateDropdownProps = {
  value?: Date;
  onChange?: (value: Date) => void;
};

export function DateDropdown({ value, onChange }: DateDropdownProps) {
  // TODO: DatePicker 컴포넌트가 완성되면 교체
  const handleSelect = (date: Date | undefined) => {
    if (date && onChange) {
      onChange(date);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>{value?.toString() || '날짜 선택'}</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item value="temp">
          <DayPicker
            required
            selected={value}
            onSelect={handleSelect}
            mode="single"
          />
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
