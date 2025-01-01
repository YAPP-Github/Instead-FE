import { createTheme } from '@vanilla-extract/css';
import { lightTheme } from './light';
import { darkTheme } from './dark';
import type { ThemeContract } from './contract';

const [lightThemeClass, vars] = createTheme<ThemeContract>(lightTheme);
const darkThemeClass = createTheme(vars, darkTheme);

export { lightThemeClass, darkThemeClass, vars };
export type { ThemeContract };
export type Vars = typeof vars;
