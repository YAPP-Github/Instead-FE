import {
  forwardRef,
  ComponentPropsWithoutRef,
  useState,
  useCallback,
  KeyboardEvent,
  useRef,
} from 'react';
import { radioCardsRootStyle } from './RadioCards.css';
import { RadioCardsProvider } from './context';

const keyDirections = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
} as const;

export type RadioCardsProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  columns?: 1 | 2 | 3 | 4 | 5;
} & Omit<ComponentPropsWithoutRef<'div'>, 'onChange'>;

export const RadioCardsRoot = forwardRef<HTMLDivElement, RadioCardsProps>(
  (
    {
      children,
      value: controlledValue,
      defaultValue,
      onChange,
      disabled,
      columns = 1,
      className = '',
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const value = controlledValue ?? uncontrolledValue;
    const itemsRef = useRef<HTMLDivElement[]>([]);

    const handleChange = useCallback(
      (newValue: string) => {
        setUncontrolledValue(newValue);
        onChange?.(newValue);
      },
      [onChange]
    );

    const items = itemsRef.current;

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>, currentIndex: number) => {
        if (!items.length) return;

        const direction =
          keyDirections[event.key as keyof typeof keyDirections];
        if (!direction) return;

        event.preventDefault();
        const nextIndex =
          (currentIndex + direction + items.length) % items.length;
        items[nextIndex]?.focus();
      },
      []
    );

    return (
      <RadioCardsProvider
        value={{
          value,
          onChange: handleChange,
          disabled,
          itemsRef: itemsRef.current,
          onKeyDown: handleKeyDown,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          aria-orientation="vertical"
          className={`${radioCardsRootStyle({ columns: columns })} ${className}`}
          {...props}
        >
          {children}
        </div>
      </RadioCardsProvider>
    );
  }
);

RadioCardsRoot.displayName = 'RadioCards';
