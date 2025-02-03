import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const KeywordChipRecipe = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    padding: '0 1.6rem',
    height: '4rem',
    width: 'fit-content',
    borderRadius: '2.4rem',
    backgroundColor: vars.colors.grey25,
    color: vars.colors.grey500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    ':hover': {
      opacity: 0.8,
    },
  },
  variants: {
    isSelected: {
      true: {
        backgroundColor: vars.colors.primary200,
        color: vars.colors.primary800,
      },
    },
  },
});

export const keywordChipGroupWrapper = style({
  display: 'flex',
  gap: vars.space[10],
});
