import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const backgroundStyle = style({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  position: 'fixed',
  bottom: 0,
  padding: '2rem 2.4rem',
  borderTop: `0.1rem solid ${vars.colors.grey100}`,
  background: 'rgba(255, 255, 255, 0.01)',
  backdropFilter: 'blur(50px)',
});
