import { tokens } from '@/tokens/tokens';

export type ThemeContract = {
  colors: {
    primary: string;
    primary400to200: string;
    primaryHover: string;
    warning300: string;
    warning500: string;
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
    greyA08: string;
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

    primary200: string;
    primary500: string;
    primary600: string;
    primary700: string;
    primary800: string;

    shadow: string;
    hover: string;
    blue: string;

    //TODO 삭제 예정
    green200: string;
    green400: string;
    green600: string;
    green800: string;

    pink200: string;
    pink400: string;
    pink600: string;
    pink800: string;

    orange200: string;
    orange400: string;
    orange800: string;

    blue200: string;
    blue400: string;
    blue800: string;

    purple100: string;
    purple200: string;
    purple400: string;
    purple600: string;
    purple700: string;
    purple800: string;

    violet0: string;
    violet100: string;
    violet200: string;
    violet400: string;
    violet800: string;
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
