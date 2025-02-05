import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  height: '100%',
  minWidth: '90rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

export const controlBar = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '2rem 2.4rem',
});

export const postWrapper = style({
  width: '82rem',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
});

export const titleWrapper = style({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: '1.6rem',
  padding: '1.6rem 1.2rem 3.2rem 1.2rem',
});
