import { forwardRef, ComponentPropsWithoutRef, useContext } from 'react';
import { Icon } from '@/components';
import { TextFieldContext } from './context';
import { submitButtonStyle } from './TextField.css';

export type TextFieldSubmitProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
>;

export const TextFieldSubmit = forwardRef<
  HTMLButtonElement,
  TextFieldSubmitProps
>(({ className = '', type = 'button', ...props }, ref) => {
  const { variant, isError } = useContext(TextFieldContext);

  if (variant !== 'button') return null;

  return (
    <button
      ref={ref}
      className={`${submitButtonStyle({ isError })} ${className}`}
      type={type}
      {...props}
    >
      <Icon name="send" size={32} color={isError ? 'grey200' : 'grey950'} />
    </button>
  );
});

TextFieldSubmit.displayName = 'TextField.Submit';
