import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const dndTableRowStyle = style({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  cursor: 'grab',
  borderBottom: `1px solid ${vars.colors.grey200}`,
});

export const dndTableRowCellStyle = style({
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
});

export const contentItemWrapper = style({
  flex: 1,
});
