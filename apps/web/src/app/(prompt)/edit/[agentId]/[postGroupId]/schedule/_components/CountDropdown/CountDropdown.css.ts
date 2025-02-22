import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const triggerStyle = style({
  width: '36rem',
  height: '5.6rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1.6rem',
  backgroundColor: vars.colors.grey25,
  borderRadius: vars.borderRadius[12],
  cursor: 'pointer',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: vars.colors.grey50,
  },
});

export const contentStyle = style({
  width: '36rem',
  height: 'auto',
});
