import { recipe, RecipeVariants } from '@vanilla-extract/recipes';
import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = recipe({
  base: {
    position: 'fixed',
    right: 24,
    padding: `${vars.space[20]} ${vars.space[32]}`,
    borderRadius: 100,
    backgroundColor: vars.colors.grey700,
    color: vars.colors.grey,
  },
  variants: {
    toastPosition: {
      top: {
        top: 24,
      },
      bottom: {
        bottom: 24,
      },
    },
  },
  defaultVariants: {
    toastPosition: 'bottom',
  },
});

export type ContainerVariants = RecipeVariants<typeof container>;

export const content = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[8],
});

export const message = style({
  fontSize: vars.typography.fontSize[20],
  fontWeight: vars.typography.fontWeight.semibold,
  lineHeight: '2.4rem',
});
