import { ReactNode } from 'react';
import { lightThemeClass, darkThemeClass } from '@repo/theme';

type ThemeProviderProps = {
  children: ReactNode;
  theme?: 'light' | 'dark';
};

export function ThemeProvider({
  children,
  theme = 'light',
}: ThemeProviderProps) {
  const themeClass = theme === 'light' ? lightThemeClass : darkThemeClass;

  return <div className={themeClass}>{children}</div>;
}
