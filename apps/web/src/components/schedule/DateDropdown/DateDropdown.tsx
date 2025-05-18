'use client';

import { Dropdown } from '@repo/ui';
import { DatePicker } from '@web/components/common/DatePicker/DatePicker';
import type { DatePickerProps } from '@web/components/common/DatePicker/DatePicker';
import { DropdownTriggerWithArrow } from '../DropdownTriggerWithArrow/DropdownTriggerWithArrow';

type DateDropdownProps = DatePickerProps;

export function DateDropdown({ value, onChange }: DateDropdownProps) {
  return (
    <Dropdown>
      <DropdownTriggerWithArrow>
        {value ? new Date(value).toLocaleDateString() : '날짜 선택'}
      </DropdownTriggerWithArrow>
      <Dropdown.Content>
        <DatePicker value={value} onChange={onChange} />
      </Dropdown.Content>
    </Dropdown>
  );
}
