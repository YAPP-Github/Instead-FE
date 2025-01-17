import { tokens } from '@repo/theme';
import { style, styleVariants } from '@vanilla-extract/css';
import { recipe, RecipeVariants } from '@vanilla-extract/recipes';

export const chipRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    gap: '0.4rem',
    padding: '0.4rem 1.2rem',
    height: 'fit-content',
    width: 'fit-content',
    border: 'none',
    borderRadius: '2.4rem',
    cursor: 'pointer',
  },

  variants: {
    variant: {
      grey: {
        backgroundColor: tokens.colors.grey50,
        color: tokens.colors.grey600,
      },
      purple: {
        backgroundColor: tokens.colors.violet200,
        color: tokens.colors.violet800,
      },
      green: {
        backgroundColor: tokens.colors.green200,
        // TODO green800으로 수정 예정
        color: tokens.colors.green400,
      },
    },
  },
});

export type ChipRecipeVariants = RecipeVariants<typeof chipRecipe>;

export const addonRootStyle = styleVariants({
  grey: {
    color: tokens.colors.grey400,
  },
  purple: {
    color: tokens.colors.violet400,
  },
  green: {
    color: tokens.colors.green400,
  },
});

export const chipCloseButtonStyle = style({
  border: 'none',
  background: 'inherit',
});
