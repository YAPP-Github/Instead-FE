import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const table = style({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  backgroundColor: 'transparent',
  borderRadius: vars.borderRadius[8],
  overflow: 'hidden',
  tableLayout: 'fixed',
});
