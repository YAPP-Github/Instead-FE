import { tokens } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const iconButtonStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '4rem',
  height: '4rem',
  border: 'none',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease, color 0.2s ease',
  padding: '0.8rem',
  borderRadius: tokens.radius[8],
  backgroundColor: 'transparent',
  color: tokens.colors.grey300,
  selectors: {
    '&:hover': {
      backgroundColor: tokens.colors.grey50,
    },
  },
});
