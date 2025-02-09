import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const tableContainer = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  width: '100%',
});

export const table = style({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  backgroundColor: 'transparent',
  borderRadius: vars.borderRadius[8],
  overflow: 'hidden',
  tableLayout: 'fixed',
});

export const headerRow = style({
  backgroundColor: vars.colors.grey25,
  display: 'table-row',
});

export const headerCell = style({
  padding: `${vars.space[8]} 0`,
  textAlign: 'left',
  fontWeight: vars.typography.fontWeight.semibold,
  fontSize: vars.typography.fontSize[16],
  color: vars.colors.grey400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  selectors: {
    '&:first-child': {
      paddingLeft: vars.space[16],
    },
    '&:last-child': {
      paddingRight: vars.space[16],
    },
  },
});

export const itemsContainer = style({
  display: 'table-row-group',
});
