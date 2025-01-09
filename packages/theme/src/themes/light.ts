import { tokens } from '../tokens';
import type { ThemeContract } from './contract';

export const lightTheme: ThemeContract = {
  colors: {
    primary: tokens.colors.green200,
    primary400to200: tokens.colors.green400,
    primaryHover: tokens.colors.green300,

    warning: tokens.colors.warning500,

    grey: tokens.colors.grey0,
    grey25: tokens.colors.grey25,
    grey50: tokens.colors.grey50,
    grey50B: tokens.colors.grey50B,
    grey100: tokens.colors.grey100,
    grey200: tokens.colors.grey200,
    grey300: tokens.colors.grey300,
    grey400: tokens.colors.grey400,
    grey500: tokens.colors.grey500,
    grey600: tokens.colors.grey600,
    grey700: tokens.colors.grey700,
    grey800: tokens.colors.grey800,
    grey900: tokens.colors.grey900,
    grey950: tokens.colors.grey950,
    grey1000: tokens.colors.grey1000,

    grey0to950: tokens.colors.grey0,
    grey0to800: tokens.colors.grey0,
    grey0to700: tokens.colors.grey0,
    grey25to900: tokens.colors.grey25,
    grey25to800: tokens.colors.grey25,
    grey50Bto800: tokens.colors.grey50B,
    grey100to700: tokens.colors.grey100,
    grey100to700Hover: tokens.colors.grey200,
    grey950toPrimary: tokens.colors.grey950,
    grey1000to1000: tokens.colors.grey1000,
  },
  space: tokens.spacing,
  borderRadius: tokens.radius,
  typography: tokens.typography,
};
