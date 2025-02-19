'use client';

import { DropdownRoot } from './DropdownRoot';
import { DropdownItem } from './DropdownItem';
import { DropdownContent } from './DropdownContent';
import { DropdownTrigger } from './DropdownTrigger';
import { DropdownIcon } from './DropdownIcon';

/**
 * @example
 *
 * Dropdown 컴포넌트 사용 예시입니다. 
 * 
 * menu 모드
 *  <Dropdown>
      <Dropdown.Trigger>
        <Icon name="lineThree" />
      </Dropdown.Trigger>
      <Dropdown.Content align="right">
        <Dropdown.Item value="option1">Option 1</Dropdown.Item>
        <Dropdown.Item value="option2">Option 2</Dropdown.Item>
        <Dropdown.Item value="option3">Option 3</Dropdown.Item>
      </Dropdown.Content>
  </Dropdown>
 *
  select 모드
    <Dropdown
          value={selectedValue}
          onValueChange={setSelectedValue}
          placeholder="Select an option"
        >
          <Dropdown.Trigger />
          <Dropdown.Content>
            <Dropdown.Item value="option1">Option 1</Dropdown.Item>
            <Dropdown.Item value="option2">Option 2</Dropdown.Item>
            <Dropdown.Item value="option3">Option 3</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
 */
export const Dropdown = Object.assign(DropdownRoot, {
  Item: DropdownItem,
  Content: DropdownContent,
  Trigger: DropdownTrigger,
  Icon: DropdownIcon,
});

export type { DropdownProps } from './DropdownRoot';
export type { DropdownItemProps } from './DropdownItem';
export type { DropdownContentProps } from './DropdownContent';
export type { DropdownTriggerProps } from './DropdownTrigger';
export type { DropdownIconProps } from './DropdownIcon';
