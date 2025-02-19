import { vars } from '@repo/theme';
import { globalStyle, style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100vw',
  height: '100vh',
  display: 'flex',
});

export const image = style({
  minWidth: '90rem',
  width: '60%',
  height: '100%',
  aspectRatio: 1160 / 1080,
  objectFit: 'cover',
  backgroundColor: 'pink',
});

export const content = style({
  minWidth: '60rem',
  width: '40%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: vars.colors.grey,
});

export const logo = style({ width: '15rem', height: '4.027rem' });

globalStyle(`${logo} *`, {
  width: '15rem',
  height: '4.027rem',
});

export const text = style({
  fontSize: '4.4rem',
  fontWeight: '600',
  lineHeight: '130%',
  textAlign: 'center',
});

export const gradientButton = style({
  margin: '5rem 0rem',
  padding: '2.82rem 9.785rem',
  border: '0.2rem solid transparent',
  borderRadius: '7.05rem',
  background: `
    linear-gradient(0deg, #F9F4FF 0%, #F9F4FF 100%) padding-box,
    linear-gradient(103deg, #B68AE7 25.7%, #3348D6 54.9%, #9290DC 79.71%, #F8B3EC 105.71%) border-box
  `,
  backgroundClip: 'padding-box, border-box',
  color: vars.colors.primary800,
  fontSize: '2.82rem',
  fontWeight: vars.typography.fontWeight.semibold,
  cursor: 'pointer',

  display: 'flex',
  alignItems: 'center',
  gap: '1.41rem',
});

export const textAlignCenter = style({
  textAlign: 'center',
});
