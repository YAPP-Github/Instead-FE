import { style } from '@vanilla-extract/css';

export const wrapperStyle = style({
  position: 'fixed',
  zIndex: 100,
  top: 0,
  left: 0,
  width: '36.8rem',
  height: '100vh',
  padding: '8rem 1.6rem 0 1.6rem',
  backgroundColor: 'transparent',
  overflow: 'auto',
  background:
    'linear-gradient(0deg, #F6F7FC 0%, #F6F7FC 100%), linear-gradient(180deg, #F8F8FF 0%, #F4F5F9 48.16%, #E9F0FA 84.19%)',
});

export const titleWrapperStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2.65rem 1.2rem 1.45rem 1.2rem',
});

export const skeletonListWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
});

export const skeletonWrapperStyle = style({
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
  padding: '1.6rem 1.2rem',
});

export const skeletonTitleWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '0.4rem',
});
