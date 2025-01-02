import { tokens } from '../tokens';
import type { ThemeContract } from './contract';

export const lightTheme: ThemeContract = {
  colors: {
    primary: tokens.colors.primary.green200,
    primary400to200: tokens.colors.primary.green400,
    primaryHover: tokens.colors.primary.green300,

    warning: tokens.colors.semantic.warning500,

    grey: tokens.colors.grey[0],
    grey25: tokens.colors.grey[25],
    grey50: tokens.colors.grey[50],
    grey50B: tokens.colors.grey['50B'],
    grey100: tokens.colors.grey[100],
    grey200: tokens.colors.grey[200],
    grey300: tokens.colors.grey[300],
    grey400: tokens.colors.grey[400],
    grey500: tokens.colors.grey[500],
    grey600: tokens.colors.grey[600],
    grey700: tokens.colors.grey[700],
    grey800: tokens.colors.grey[800],
    grey900: tokens.colors.grey[900],
    grey950: tokens.colors.grey[950],
    grey1000: tokens.colors.grey[1000],

    grey0to950: tokens.colors.grey[0],
    grey0to800: tokens.colors.grey[0],
    grey0to700: tokens.colors.grey[0],
    grey25to900: tokens.colors.grey[25],
    grey25to800: tokens.colors.grey[25],
    grey50Bto800: tokens.colors.grey['50B'],
    grey100to700: tokens.colors.grey[100],
    grey100to700Hover: tokens.colors.grey[200],
    grey950toPrimary: tokens.colors.grey[950],
    grey1000to1000: tokens.colors.grey[1000],
  },
  space: tokens.spacing,
  borderRadius: tokens.radius,
  typography: tokens.typography,
};
