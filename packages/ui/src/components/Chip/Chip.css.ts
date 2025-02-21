import { vars } from '@repo/theme';
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
    fontSize: vars.typography.fontSize[16],
    fontWeight: vars.typography.fontWeight.semibold,
    lineHeight: '150%',
  },

  variants: {
    variant: {
      grey: {
        backgroundColor: vars.colors.grey50,
        color: vars.colors.grey600,
      },
      purple: {
        backgroundColor: vars.colors.purple200,
        color: vars.colors.purple800,
      },
      green: {
        backgroundColor: vars.colors.blue200,
        color: vars.colors.blue800,
      },
    },
  },
});

export type ChipRecipeVariants = RecipeVariants<typeof chipRecipe>;

export const addonRootRecipe = recipe({
  base: {
    lineHeight: 0,
  },
  variants: {
    color: {
      grey: {
        color: vars.colors.grey400,
      },
      purple: {
        color: vars.colors.purple400,
      },
      green: {
        color: vars.colors.blue400,
      },
    },
  },
});

export const chipCloseButtonRecipe = recipe({
  base: {
    border: 'none',
    background: 'inherit',
    display: 'inline-block',
    width: 'auto',
    height: 'auto',
    lineHeight: 0,
  },
  variants: {
    clickable: {
      true: {
        cursor: 'pointer',
      },
      false: {},
    },
  },
});
