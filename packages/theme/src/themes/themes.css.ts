import { createTheme } from '@vanilla-extract/css';
import { lightTheme } from './light';
import { darkTheme } from './dark';
import type { ThemeContract } from './contract';

export const [lightThemeClass, vars] = createTheme<ThemeContract>(lightTheme);
export const darkThemeClass = createTheme(vars, darkTheme);
export type VarsType = typeof vars;
