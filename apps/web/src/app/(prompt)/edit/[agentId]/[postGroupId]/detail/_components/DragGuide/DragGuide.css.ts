import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const container = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
  height: 'fit-content',
  borderRadius: vars.borderRadius[24],
  border: `1px solid ${vars.colors.grey50}`,
  background: vars.colors.grey,
  padding: vars.space[40],
});

export const description = style({
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});
