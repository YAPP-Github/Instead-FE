import { style } from '@vanilla-extract/css';

export const contentItemStyle = style({
  display: 'inline-flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1.6rem',
  height: '6.4rem',
  padding: '1.6rem 1.6rem 1.6rem 1.2rem',
});

export const noShrinkStyle = style({
  flexShrink: 0,
});
