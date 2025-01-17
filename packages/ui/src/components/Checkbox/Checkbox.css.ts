import { recipe } from '@vanilla-extract/recipes';
import { vars, tokens } from '@repo/theme';

export const container = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: tokens.spacing[4],
    cursor: 'pointer',
  },
  variants: {
    disabled: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.5,
      },
    },
  },
});

export const checkboxWrapper = recipe({
  base: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const input = recipe({
  base: {
    position: 'absolute',
    opacity: 0,
    width: '100%',
    height: '100%',
    margin: 0,
    cursor: 'pointer',
    ':disabled': {
      cursor: 'not-allowed',
    },
  },
});

export const label = recipe({
  base: {
    color: vars.colors.grey900,
    fontSize: vars.typography.fontSize[16],
    fontWeight: vars.typography.fontWeight.medium,
  },
});
