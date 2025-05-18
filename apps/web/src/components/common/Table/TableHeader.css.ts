import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const headerRow = style({
  height: '4rem',
  width: '100%',
  display: 'grid',
});

export const headerCell = style({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: vars.colors.grey25,
  boxSizing: 'border-box',
  overflow: 'visible',
  padding: `${vars.space[8]} 0`,
  textAlign: 'left',
  fontWeight: vars.typography.fontWeight.semibold,
  fontSize: vars.typography.fontSize[16],
  color: vars.colors.grey400,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  height: '100%',
  selectors: {
    '&:first-child': {
      paddingLeft: vars.space[16],
      borderTopLeftRadius: vars.borderRadius[8],
      borderBottomLeftRadius: vars.borderRadius[8],
    },
    '&:last-child': {
      paddingRight: vars.space[16],
      borderTopRightRadius: vars.borderRadius[8],
      borderBottomRightRadius: vars.borderRadius[8],
    },
  },
});
