import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const mainStyle = style({
  maxWidth: '100%',
  height: '100vh',
  margin: '0 auto',
  background: 'radial-gradient(100% 100% at 51.8% 0%, #D7DAFF 0%, #FFF 79.28%)',
  overflow: 'auto',
});

export const contentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4.8rem',
});

export const sectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[16],
});

export const labelDiscriptionWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
});
