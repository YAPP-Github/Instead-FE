import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@repo/theme';

export const textContent = recipe({
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: vars.space[8],
    color: vars.colors.grey600,
    width: '100%',
  },
  variants: {
    isCenter: {
      true: { justifyContent: 'center' },
      false: { justifyContent: 'flex-start' },
    },
  },
});

export const imagesContent = style({
  display: 'flex',
  justifyContent: 'flex-end',
});
