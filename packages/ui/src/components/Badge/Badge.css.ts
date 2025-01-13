import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@repo/theme';

export const badge = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    height: 'fit-content',
  },

  variants: {
    size: {
      medium: {
        fontSize: vars.typography.fontSize[14],
        fontWeight: vars.typography.fontWeight.medium,
        lineHeight: '150%',
      },
      large: {
        fontSize: vars.typography.fontSize[20],
        fontWeight: vars.typography.fontWeight.semibold,
        lineHeight: '150%',
      },
    },
    variant: {
      neutral: {
        backgroundColor: vars.colors.grey50,
        color: vars.colors.grey600,
      },
      primary: {
        backgroundColor: vars.colors.primary600,
        color: vars.colors.grey,
      },
      pink: {
        backgroundColor: vars.colors.pink200,
        color: vars.colors.grey600,
      },
      blue: {
        backgroundColor: vars.colors.blue200,
        color: vars.colors.grey600,
      },
    },
    shape: {
      round: {
        borderRadius: 100,
      },
      square: {
        borderRadius: '4px',
      },
    },
  },

  compoundVariants: [
    {
      variants: { shape: 'round', size: 'medium' },
      style: { padding: '4px 10px' },
    },
    {
      variants: { shape: 'square', size: 'medium' },
      style: { padding: '2px 6px' },
    },
    {
      variants: { shape: 'square', size: 'large' },
      style: { padding: '4px 8px' },
    },
  ],
});
