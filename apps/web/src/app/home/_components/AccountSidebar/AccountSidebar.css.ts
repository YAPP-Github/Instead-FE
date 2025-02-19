import { style } from '@vanilla-extract/css';

export const wrapper = style({
  minWidth: '36.8rem',
  minHeight: '100vh',
  margin: '0 0 0 1.6rem',
  backgroundColor: 'transparent',
  overflow: 'auto',
});

export const titleWrapper = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2.65rem 1.2rem 1.45rem 1.2rem',
});
