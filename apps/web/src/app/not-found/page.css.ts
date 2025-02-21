import { style } from '@vanilla-extract/css';

export const wrapper = style({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100vh',
  background: 'radial-gradient(100% 100% at 51.8% 0%, #D7DAFF 0%, #FFF 79.28%)',
});

export const nav = style({
  padding: '2rem 2.4rem',
  width: '100%',
  position: 'fixed',
  top: 0,
});

export const image = style({
  width: '25.4rem',
  height: 'auto',
});
