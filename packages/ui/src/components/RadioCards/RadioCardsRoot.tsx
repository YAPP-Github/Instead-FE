import {
  forwardRef,
  ComponentPropsWithoutRef,
  useState,
  useCallback,
} from 'react';
import { radioCardsRootStyle } from './RadioCards.css';
import { RadioCardsProvider } from './context';

export type RadioCardsProps = {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  columns?: 1 | 2 | 3;
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

    const handleChange = useCallback(
      (newValue: string) => {
        setUncontrolledValue(newValue);
        onChange?.(newValue);
      },
      [onChange]
    );

    return (
      <RadioCardsProvider
        value={{
          value,
          onChange: handleChange,
          disabled,
        }}
      >
        <div
          ref={ref}
          role="radiogroup"
          className={`${radioCardsRootStyle({ columns })} ${className}`}
          {...props}
        >
          {children}
        </div>
      </RadioCardsProvider>
    );
  }
);

RadioCardsRoot.displayName = 'RadioCards';
