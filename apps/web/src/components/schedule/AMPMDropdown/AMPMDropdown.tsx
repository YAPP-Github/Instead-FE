'use client';

import { Dropdown } from '@repo/ui';
import { DropdownTriggerWithArrow } from '../DropdownTriggerWithArrow/DropdownTriggerWithArrow';

type AMPMDropdownProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export function AMPMDropdown({ value = '오전', onChange }: AMPMDropdownProps) {
  return (
    <Dropdown value={value} onValueChange={onChange}>
      <DropdownTriggerWithArrow>{value}</DropdownTriggerWithArrow>
      <Dropdown.Content>
        {OPTIONS.map((option) => (
          <Dropdown.Item key={option} value={option}>
            {option}
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}

const OPTIONS = ['오전', '오후'] as const;
