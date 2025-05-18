import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const table = style({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  backgroundColor: 'transparent',
  overflow: 'visible',
  tableLayout: 'fixed',
  borderRadius: vars.borderRadius[8],
});
