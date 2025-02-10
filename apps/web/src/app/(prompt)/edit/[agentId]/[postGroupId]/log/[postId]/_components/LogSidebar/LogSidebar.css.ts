import { tokens } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const sidebarWrapper = style({
  width: '42.3rem',
  height: '100vh',
  flexShrink: '0',
  backgroundColor: `${tokens.colors.grey0}`,
});

export const closeArea = style({
  padding: '2rem 2.4rem',
  display: 'flex',
  justifySelf: 'flex-end',
});
