import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const mainStyle = style({
  maxWidth: '800px',
  margin: '0 auto',
  padding: `${vars.space[40]} ${vars.space[16]}`,
});

export const headerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '4.8rem',
});

export const contentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[32],
});

export const titleStyle = style({
  color: vars.colors.grey900,
});

export const sectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[8],
});
