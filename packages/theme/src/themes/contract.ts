import { tokens } from '../tokens';

export type ThemeContract = {
  colors: {
    primary: string;
    primary400to200: string;
    primaryHover: string;
    warning: string;
    grey: string;
    grey25: string;
    grey50: string;
    grey50B: string;
    grey100: string;
    grey200: string;
    grey300: string;
    grey400: string;
    grey500: string;
    grey600: string;
    grey700: string;
    grey800: string;
    grey900: string;
    grey950: string;
    grey1000: string;
    grey0to950: string;
    grey0to800: string;
    grey0to700: string;
    grey25to900: string;
    grey25to800: string;
    grey50Bto800: string;
    grey100to700: string;
    grey100to700Hover: string;
    grey950toPrimary: string;
    grey1000to1000: string;

    primary500: string;
    primary600: string;
    primary700: string;
    primary800: string;

    shadow: string;
    blue: string;

    pink200: string;
    pink400: string;
    pink800: string;

    orange200: string;
    orange400: string;
    orange800: string;

    blue200: string;
    blue400: string;
    blue800: string;
  };
  space: {
    [K in keyof typeof tokens.spacing]: string;
  };
  borderRadius: {
    [K in keyof typeof tokens.radius]: string;
  };
  typography: {
    fontSize: {
      [K in keyof typeof tokens.typography.fontSize]: string;
    };
    fontWeight: {
      [K in keyof typeof tokens.typography.fontWeight]: string;
    };
  };
};
