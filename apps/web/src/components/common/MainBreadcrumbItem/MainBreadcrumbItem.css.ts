import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

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

export const insteadTextWrapperStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[8],
});

export const insteadTextStyle = style({
  color: vars.colors.grey900,
  fontSize: vars.typography.fontSize[24],
  fontStyle: 'normal',
  fontWeight: vars.typography.fontWeight.bold,
  lineHeight: 'normal',
});
