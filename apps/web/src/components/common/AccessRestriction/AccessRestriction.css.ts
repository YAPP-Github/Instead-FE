import { style } from '@vanilla-extract/css';

export const wrapper = style({
  textAlign: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexDirection: 'column',
  height: '100vh',
  background: 'radial-gradient(260.22% 100% at 51.8% 0%, #CBCFFF 0%, #FFF 30%)',
  '@media': {
    'screen and (max-width: 550px)': {
      justifyContent: 'center',
      background:
        'radial-gradient(260.22% 100% at 51.8% 0%, #CBCFFF 0%, #FFF 30%)',
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
  width: '12rem',
  height: '3.8rem',
  marginBottom: '0.6rem',

  '@media': {
    'screen and (max-width: 550px)': {
      width: '8.8rem',
      height: '2.347rem',
      marginBottom: '0.453rem',
    },
  },
});
