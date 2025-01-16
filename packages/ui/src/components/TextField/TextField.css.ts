import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@repo/theme';

export const textFieldWrapperStyle = style({
  position: 'relative',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[8],
});

export const textFieldStyle = recipe({
  base: {
    width: '100%',
    minHeight: '59px',
    padding: '16px',
    borderRadius: '12px',
    border: 'none',
    outline: 'none',
    resize: 'none',
    overflow: 'hidden',
    color: vars.colors.grey700,
    fontSize: vars.typography.fontSize[18],
    fontWeight: vars.typography.fontWeight.medium,
    lineHeight: '150%',
    fontFamily: 'inherit',
    transition: 'all 0.2s ease',
  },
  variants: {
    variant: {
      default: {
        backgroundColor: vars.colors.grey25,
        color: vars.colors.grey900,
        paddingRight: '16px',
        '::placeholder': {
          color: vars.colors.grey400,
        },
      },
      button: {
        backgroundColor: vars.colors.grey50,
        color: vars.colors.grey900,
        paddingRight: '48px',
        '::placeholder': {
          color: vars.colors.grey400,
        },
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const submitButtonStyle = recipe({
  base: {
    position: 'absolute',
    bottom: '45px',
    right: vars.space[12],
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    padding: 0,
    cursor: 'pointer',

    ':hover': {
      opacity: 0.8,
    },
  },
  variants: {
    isError: {
      true: {
        cursor: 'not-allowed',
      },
    },
  },
});

export const counterStyle = recipe({
  base: {
    fontSize: vars.typography.fontSize[16],
    fontWeight: vars.typography.fontWeight.medium,
    margin: `0 ${vars.space[8]}`,
    lineHeight: '1.5',
    textAlign: 'right',
  },
  variants: {
    isError: {
      false: {
        color: vars.colors.grey500,
      },
      true: {
        color: vars.colors.warning,
      },
    },
  },
  defaultVariants: {
    isError: false,
  },
});

export const labelStyle = recipe({
  variants: {
    isError: {
      true: {
        color: vars.colors.warning,
      },
    },
  },
});
