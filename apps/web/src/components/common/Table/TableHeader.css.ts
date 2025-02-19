import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const headerRow = style({
  backgroundColor: vars.colors.grey25,
  height: '5.2rem',
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
  },
});
