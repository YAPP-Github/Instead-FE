'use client';

import { Dropdown, IconButton } from '@repo/ui';
import * as style from './StartDateDropdown.css';
import { DatePicker } from '@web/components/common/DatePicker/DatePicker';
import type { DatePickerProps } from '@web/components/common/DatePicker/DatePicker';

type StartDateDropdownProps = DatePickerProps;

export function StartDateDropdown({ value, onChange }: StartDateDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Trigger className={style.triggerStyle}>
        {value ? new Date(value).toLocaleDateString() : '날짜 선택'}
        <IconButton icon="calendar" color="grey300" />
      </Dropdown.Trigger>
      <Dropdown.Content className={style.contentStyle}>
        <DatePicker value={value} onChange={onChange} />
      </Dropdown.Content>
    </Dropdown>
  );
}
