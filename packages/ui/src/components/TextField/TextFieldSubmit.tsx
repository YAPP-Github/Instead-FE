import { forwardRef, ComponentPropsWithoutRef, useContext } from 'react';
import { Icon } from '../Icon';
import { TextFieldContext } from './context';
import { submitButtonStyle } from './TextField.css';

export type TextFieldSubmitProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
>;

export const TextFieldSubmit = forwardRef<
  HTMLButtonElement,
  TextFieldSubmitProps
>(({ className = '', type = 'button', disabled, ...props }, ref) => {
  const { variant, isError } = useContext(TextFieldContext);

  if (variant !== 'button' && variant !== 'white') return null;

  return (
    <button
      ref={ref}
      className={`${submitButtonStyle({ isError, isDisabled: disabled })} ${className}`}
      type={type}
      disabled={disabled}
      {...props}
    >
      <Icon
        name="send"
        size="3.2rem"
        color={isError || disabled ? 'grey200' : 'grey950'}
      />
    </button>
  );
});

TextFieldSubmit.displayName = 'TextField.Submit';
