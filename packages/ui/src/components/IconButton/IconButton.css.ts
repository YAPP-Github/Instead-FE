import { vars } from '@repo/theme';
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
  borderRadius: vars.borderRadius[8],
  backgroundColor: 'transparent',
  color: vars.colors.grey300,
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grey50,
    },
    '&:disabled': {
      // TODO  디자이너분과 논의 후 색상 바꾸기
      color: vars.colors.grey100,
      pointerEvents: 'none',
    },
  },
});
