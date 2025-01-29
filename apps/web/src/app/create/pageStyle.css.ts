import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const mainStyle = style({
  maxWidth: '100%',
  height: '100vh',
  margin: '0 auto',
  background: 'radial-gradient(circle at 50% 0%, #D7DAFF 0%, #FFFFFF 76%)',
  overflow: 'auto',
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
