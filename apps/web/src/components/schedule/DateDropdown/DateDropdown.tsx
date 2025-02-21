'use client';

import { Dropdown } from '@repo/ui';
import * as style from './DateDropdown.css';
import { DatePicker } from '@web/components/common/DatePicker/DatePicker';
import type { DatePickerProps } from '@web/components/common/DatePicker/DatePicker';

type DateDropdownProps = DatePickerProps;

export function DateDropdown({ value, onChange }: DateDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Trigger>{value?.toString() ?? '날짜 선택'}</Dropdown.Trigger>
      <Dropdown.Content className={style.contentStyle}>
        <DatePicker value={value} onChange={onChange} />
      </Dropdown.Content>
    </Dropdown>
  );
}
