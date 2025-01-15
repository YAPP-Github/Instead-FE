import { tokens } from '@repo/theme';
import { styleVariants } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { ButtonSize } from './Button';

export const buttonRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    height: 'fit-content',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease, color 0.2s ease',
    selectors: {
      '&:disabled': {
        cursor: 'not-allowed',
        pointerEvents: 'none',
      },
    },
  },

  variants: {
    size: {
      large: {
        gap: '0.8rem',
        padding: '1.6rem 2rem',
        borderRadius: tokens.radius[12],
        fontSize: tokens.typography.fontSize[22],
        fontWeight: tokens.typography.fontWeight.semibold,
      },
      small: {
        gap: '0.4rem',
        padding: '1rem 2rem',
        borderRadius: tokens.radius[8],
        fontSize: tokens.typography.fontSize[18],
        fontWeight: tokens.typography.fontWeight.semibold,
      },
    },

    variant: {
      primary: {
        backgroundColor: tokens.colors.primary600,
        color: tokens.colors.grey0,
        selectors: {
          '&:hover': {
            backgroundColor: tokens.colors.primary700,
            color: tokens.colors.grey0,
          },
          '&:disabled': {
            backgroundColor: tokens.colors.grey200,
            color: tokens.colors.grey0,
          },
        },
      },
      neutral: {
        backgroundColor: tokens.colors.grey950,
        color: tokens.colors.grey0,
        selectors: {
          '&:hover': {
            backgroundColor: tokens.colors.grey700,
            color: tokens.colors.grey0,
          },
          '&:disabled': {
            backgroundColor: tokens.colors.grey200,
            color: tokens.colors.grey0,
          },
        },
      },
      terminal: {
        backgroundColor: 'transparent',
        color: tokens.colors.grey1000,
        selectors: {
          '&:hover': {
            backgroundColor: tokens.colors.grey50,
            color: tokens.colors.grey1000,
          },
          '&:disabled': {
            // TODO 디자이너 분들이 지정해 주시면 스타일 수정 필요
            backgroundColor: tokens.colors.grey200,
            color: tokens.colors.grey0,
          },
        },
      },
    },
  },
});

export type ButtonRecipeVariants = RecipeVariants<typeof buttonRecipe>;

export const addonRootStyle = styleVariants({
  large: {
    width: '2.4rem',
    height: '2.4rem',
  },
  small: {
    width: '1.6rem',
    height: '1.6rem',
  },
});
