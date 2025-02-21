import { IconButton } from '@repo/ui';
import { DayPicker } from 'react-day-picker';
import './dayPicker.css';

export type DatePickerProps = {
  value?: Date;
  onChange?: (value: Date) => void;
};

/**
 *
 * TODO: DatePicker 컴포넌트가 완성되면 교체
 */
export function DatePicker({ value, onChange }: DatePickerProps) {
  const handleSelect = (date: Date | undefined) => {
    if (date && onChange) {
      onChange(date);
    }
  };

  return (
    <DayPicker
      required
      selected={value}
      onSelect={handleSelect}
      mode="single"
      components={{
        NextMonthButton: () => <IconButton icon="arrowRight" />,
        PreviousMonthButton: () => <IconButton icon="arrowLeft" />,
      }}
    />
  );
}
