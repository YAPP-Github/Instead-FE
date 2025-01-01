import { tokens } from '../tokens';
import type { ThemeContract } from './contract';

export const darkTheme: ThemeContract = {
  colors: {
    primary: tokens.colors.primary.green200,
    primary400to200: tokens.colors.primary.green200,
    primaryHover: tokens.colors.primary.green100,

    warning: tokens.colors.semantic.warning300,

    grey: tokens.colors.grey[1000],
    grey25: tokens.colors.grey[950],
    grey50: tokens.colors.grey[900],
    grey50B: tokens.colors.grey[900],
    grey100: tokens.colors.grey[800],
    grey200: tokens.colors.grey[700],
    grey300: tokens.colors.grey[600],
    grey400: tokens.colors.grey[500],
    grey500: tokens.colors.grey[400],
    grey600: tokens.colors.grey[300],
    grey700: tokens.colors.grey[200],
    grey800: tokens.colors.grey[100],
    grey900: tokens.colors.grey[50],
    grey950: tokens.colors.grey[25],
    grey1000: tokens.colors.grey[0],

    grey0to950: tokens.colors.grey[950],
    grey0to800: tokens.colors.grey[800],
    grey0to700: tokens.colors.grey[700],
    grey25to900: tokens.colors.grey[900],
    grey25to800: tokens.colors.grey[800],
    grey50Bto800: tokens.colors.grey[800],
    grey100to700: tokens.colors.grey[700],
    grey100to700Hover: tokens.colors.grey[600],
    grey950toPrimary: tokens.colors.primary.green200,
    grey1000to1000: tokens.colors.grey[1000],
  },
  space: tokens.spacing,
  borderRadius: tokens.radius,
  typography: tokens.typography,
};
