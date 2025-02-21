import { globalStyle, style } from '@vanilla-extract/css';

export const wrapper = style({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  height: '100vh',
  background: 'radial-gradient(100% 100% at 51.8% 0%, #D7DAFF 0%, #FFF 79.28%)',
  '@media': {
    'screen and (max-width: 360px)': {
      justifyContent: 'center',
    },
  },
});
export const logo = style({
  '@media': {
    'screen and (max-width: 360px)': {
      width: '8.8rem',
      height: 'auto',
      marginBottom: '0.6rem',
    },
  },
});

export const nav = style({
  padding: '2rem 2.4rem',
  width: '100%',
  position: 'fixed',
  display: 'flex',
  justifyContent: 'flex-start',
  top: 0,
});

export const image = style({
  marginTop: '6.4rem',
  width: '100%',
  height: 'auto',
});

export const logoOverride = style({
  width: '100% !important',
  height: 'auto !important',
  display: 'block',
});
