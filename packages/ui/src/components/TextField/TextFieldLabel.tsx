import { forwardRef, ComponentPropsWithoutRef, useContext } from 'react';
import { Label } from '../Label';
import { TextFieldContext } from './context';
import { labelStyle } from './TextField.css';

export type TextFieldLabelProps = ComponentPropsWithoutRef<typeof Label>;

export const TextFieldLabel = forwardRef<HTMLLabelElement, TextFieldLabelProps>(
  ({ className = '', ...props }, ref) => {
    const { id, isError } = useContext(TextFieldContext);
    return (
      <Label
        ref={ref}
        htmlFor={id}
        className={`${labelStyle({ isError })} ${className}`}
        {...props}
      />
    );
  }
);

TextFieldLabel.displayName = 'TextField.Label';
