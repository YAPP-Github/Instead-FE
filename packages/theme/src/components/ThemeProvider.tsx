import React from 'react';
import { lightThemeClass, darkThemeClass } from '../themes/themes.css';

interface ThemeProviderProps {
  children: React.ReactNode;
  theme?: 'light' | 'dark';
}

export function ThemeProvider({
  children,
  theme = 'light',
}: ThemeProviderProps) {
  const themeClass = theme === 'light' ? lightThemeClass : darkThemeClass;

  return <div className={themeClass}>{children}</div>;
}
