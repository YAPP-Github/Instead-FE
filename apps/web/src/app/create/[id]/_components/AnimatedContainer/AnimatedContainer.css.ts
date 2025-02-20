import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const containerStyle = style({
  margin: '0 auto',
  minWidth: '86rem',
  maxWidth: '92rem',
  padding: `${vars.space[32]} ${vars.space[32]} 12rem ${vars.space[32]}`,

  borderRadius: '2.4rem 2.4rem 0 0',
  backgroundColor: vars.colors.grey,
  marginBottom: '20rem',
});
