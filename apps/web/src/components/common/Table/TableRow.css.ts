import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const tableRowStyle = style({
  height: '6.4rem',
});

export const tableRowCellStyle = style({
  display: 'flex',
  alignItems: 'center',
  borderBottom: `0.1rem solid ${vars.colors.grey100}`,
  padding: `${vars.space[16]} 0`,
  selectors: {
    '&:first-child': {
      paddingLeft: vars.space[16],
    },
  },
});

export const contentItemWrapper = style({
  flex: 1,
});
