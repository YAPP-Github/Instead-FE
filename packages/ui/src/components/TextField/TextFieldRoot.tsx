import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';
import { TextFieldContext, TextFieldContextValue } from './context';
import { textFieldWrapperStyle } from './TextField.css';

export type TextFieldProps = {
  children: ReactNode;
} & TextFieldContextValue &
  ComponentPropsWithoutRef<'div'>;

export const TextFieldRoot = forwardRef<HTMLDivElement, TextFieldProps>(
  (
    {
      id,
      variant = 'default',
      isError = false,
      children,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <TextFieldContext.Provider value={{ id, variant, isError }}>
        <div
          ref={ref}
          className={`${textFieldWrapperStyle} ${className}`}
          {...props}
        >
          {children}
        </div>
      </TextFieldContext.Provider>
    );
  }
);

TextFieldRoot.displayName = 'TextField.Root';
