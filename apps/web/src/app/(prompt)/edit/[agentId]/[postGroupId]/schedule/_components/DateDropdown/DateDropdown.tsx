'use client';

import { Dropdown } from '@repo/ui';

type DateDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function DateDropdown({ value, onChange }: DateDropdownProps) {
  // TODO: DatePicker 컴포넌트가 완성되면 교체
  return (
    <Dropdown value={value} onValueChange={onChange}>
      <Dropdown.Trigger>{value || '날짜 선택'}</Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Item value="temp">DatePicker 구현 예정</Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}
