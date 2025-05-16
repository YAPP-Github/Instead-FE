'use client';

import { Dropdown } from '@repo/ui';
import { DropdownTriggerWithArrow } from '../DropdownTriggerWithArrow/DropdownTriggerWithArrow';

type MinuteDropdownProps = {
  value?: string;
  onChange: (value: string) => void;
};

export function MinuteDropdown({
  value = '00',
  onChange,
}: MinuteDropdownProps) {
  return (
    <Dropdown value={value} onValueChange={onChange}>
      <DropdownTriggerWithArrow>{value}분</DropdownTriggerWithArrow>
      <Dropdown.Content>
        {MINUTES.map((minute) => (
          <Dropdown.Item key={minute} value={minute}>
            {minute}분
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}

const MINUTES = ['00', '30'] as const;
