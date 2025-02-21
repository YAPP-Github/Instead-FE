import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const gradientButton = style({
  margin: '5rem 0rem',
  padding: '2.4rem 9.8rem',
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
