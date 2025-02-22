'use client';

import { Dropdown } from '@repo/ui';
import * as styles from './WhenDropdown.css';
import { IconButton, Text, Checkbox } from '@repo/ui';
import { useState, useEffect } from 'react';
import { timeSlots } from '../../constants/time';
import { isNotNil } from '@repo/ui/utils';

type WhenDropdownProps = {
  value?: string;
  onChange: (value: string) => void;
};

export function WhenDropdown({ value = '', onChange }: WhenDropdownProps) {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const allSelected = selectedSlots.length === timeSlots.length;

  const handleCheckboxChange = (label: string) => {
    setSelectedSlots((prev) => {
      const newSlots = prev.includes(label)
        ? prev.filter((slot) => slot !== label)
        : [...prev, label];

      onChange(newSlots.join(', '));
      return newSlots;
    });
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedSlots([]);
      onChange('');
    } else {
      const allLabels = timeSlots.map((slot) => slot.label);
      setSelectedSlots(allLabels);
      onChange(allLabels.join(', '));
    }
  };

  useEffect(() => {
    if (value === '전체 선택') {
      return setSelectedSlots(timeSlots.map((slot) => slot.label));
    }
    if (isNotNil(value)) {
      return setSelectedSlots(value.split(', '));
    }
  }, [value]);

  return (
    <Dropdown value={value} onValueChange={onChange}>
      <Dropdown.Trigger className={styles.triggerStyle}>
        {allSelected ? '전체 선택' : selectedSlots.join(', ')}
        <IconButton icon="arrowBottom" color="grey300" />
      </Dropdown.Trigger>
      <Dropdown.Content className={styles.contentStyle}>
        <Dropdown.Item>
          <div className={styles.itemStyle}>
            <div className={styles.labelStyle}>
              <Text.P fontSize={20} fontWeight="medium" color="grey900">
                전체 선택
              </Text.P>
            </div>
            <Checkbox checked={allSelected} onChange={handleSelectAll} />
          </div>
        </Dropdown.Item>
        {timeSlots.map((slot, index) => (
          <Dropdown.Item key={index} value={slot.label}>
            <div className={styles.itemStyle}>
              <div className={styles.labelStyle}>
                <Text.P fontSize={20} fontWeight="medium" color="grey900">
                  {slot.label}
                </Text.P>
                <Text.P fontSize={16} fontWeight="medium" color="grey500">
                  {slot.time}
                </Text.P>
              </div>
              <Checkbox
                checked={selectedSlots.includes(slot.label)} // 체크 상태 관리
                onChange={() => handleCheckboxChange(slot.label)} // 체크박스 상태 변경
              />
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Content>
    </Dropdown>
  );
}
