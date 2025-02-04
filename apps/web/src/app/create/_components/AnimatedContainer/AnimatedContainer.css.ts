import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const containerStyle = style({
  maxWidth: '92rem',
  margin: '0 auto',
  width: '100%',
  padding: `${vars.space[32]} ${vars.space[32]} 12rem ${vars.space[32]}`,

  borderRadius: '2.4rem 2.4rem 0 0',
  backgroundColor: vars.colors.grey,
  marginBottom: '20rem',
});
