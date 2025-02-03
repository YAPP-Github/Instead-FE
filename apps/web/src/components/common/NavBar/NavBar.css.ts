import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const navBar = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  padding: `${vars.space[12]} ${vars.space[24]}`,
  height: '8rem',
  zIndex: 1000,
  transition: 'background 0.2s ease, backdrop-filter 0.2s ease',
});

export const scrolled = style({
  background: 'rgba(255, 255, 255, 0.01)',
  backdropFilter: 'blur(50px)',
});
