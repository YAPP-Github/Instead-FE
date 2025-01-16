import { counterStyle } from './TextField.css';
import { ComponentPropsWithoutRef, forwardRef, useContext } from 'react';
import { TextFieldContext } from './context';

export type TextFieldCounterProps = {
  current: number;
  max: number;
} & ComponentPropsWithoutRef<'span'>;

export const TextFieldCounter = forwardRef<
  HTMLSpanElement,
  TextFieldCounterProps
>(({ current, max, className = '', ...props }, ref) => {
  const { isError } = useContext(TextFieldContext);

  return (
    <span
      ref={ref}
      className={`${counterStyle({ isError })} ${className}`}
      {...props}
    >
      {current}/{max}
    </span>
  );
});

TextFieldCounter.displayName = 'TextField.Counter';
