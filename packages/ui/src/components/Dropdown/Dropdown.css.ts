import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const dropdownRoot = style({
  position: 'relative',
  display: 'inline-block',
});

export const dropdownTrigger = style({
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
});

export const dropdownContent = style({
  position: 'absolute',
  backgroundColor: vars.colors.grey,
  boxShadow: `0rem 0.4rem 1.2rem ${vars.colors.shadow}`,
  borderRadius: vars.borderRadius[12],
  zIndex: 100,
  width: 'max-content',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem 0.8rem',

  // 기본은 아래에 표시
  top: '100%',
  marginTop: '0.8rem',
});

export const dropdownContentLeft = style({
  left: 0,
});

export const dropdownContentRight = style({
  right: 0,
});

export const dropdownContentAbove = style({
  top: 'auto',
  bottom: '100%',
  marginTop: 0,
  marginBottom: '0.8rem',
});

export const dropdownItem = style({
  cursor: 'pointer',
  padding: '1.6rem',
  borderRadius: vars.borderRadius[8],
  width: '100%',
  selectors: {
    '&:hover': {
      backgroundColor: vars.colors.grey25,
    },
  },
});
