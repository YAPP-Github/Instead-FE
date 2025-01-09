import { tokens } from '../tokens';
import type { ThemeContract } from './contract';

export const darkTheme: ThemeContract = {
  colors: {
    primary: tokens.colors.green200,
    primary400to200: tokens.colors.green200,
    primaryHover: tokens.colors.green100,

    warning: tokens.colors.warning300,

    grey: tokens.colors.grey1000,
    grey25: tokens.colors.grey950,
    grey50: tokens.colors.grey900,
    grey50B: tokens.colors.grey900,
    grey100: tokens.colors.grey800,
    grey200: tokens.colors.grey700,
    grey300: tokens.colors.grey600,
    grey400: tokens.colors.grey500,
    grey500: tokens.colors.grey400,
    grey600: tokens.colors.grey300,
    grey700: tokens.colors.grey200,
    grey800: tokens.colors.grey100,
    grey900: tokens.colors.grey50,
    grey950: tokens.colors.grey25,
    grey1000: tokens.colors.grey0,

    grey0to950: tokens.colors.grey950,
    grey0to800: tokens.colors.grey800,
    grey0to700: tokens.colors.grey700,
    grey25to900: tokens.colors.grey900,
    grey25to800: tokens.colors.grey800,
    grey50Bto800: tokens.colors.grey800,
    grey100to700: tokens.colors.grey700,
    grey100to700Hover: tokens.colors.grey600,
    grey950toPrimary: tokens.colors.green200,
    grey1000to1000: tokens.colors.grey1000,
  },
  space: tokens.spacing,
  borderRadius: tokens.radius,
  typography: tokens.typography,
};
