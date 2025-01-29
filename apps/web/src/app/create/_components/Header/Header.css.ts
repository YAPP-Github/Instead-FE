import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const headerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  padding: `${vars.space[12]} ${vars.space[24]}`,
  zIndex: 1000,
});
