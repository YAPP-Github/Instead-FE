import { createContext } from 'react';

export type TextFieldVariant = 'default' | 'button' | 'white';

export type TextFieldContextValue = {
  id?: string;
  variant?: TextFieldVariant;
  isError?: boolean;
};

export const TextFieldContext = createContext<TextFieldContextValue>({});
