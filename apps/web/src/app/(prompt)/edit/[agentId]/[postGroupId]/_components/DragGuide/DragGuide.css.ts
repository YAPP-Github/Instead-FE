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
  gap: vars.space[32],
  alignSelf: 'stretch',
});

export const description = style({
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
});

export const image = style({
  width: '100%',
  height: '100%',
  maxWidth: '42rem',
  maxHeight: '12.8rem',
});
