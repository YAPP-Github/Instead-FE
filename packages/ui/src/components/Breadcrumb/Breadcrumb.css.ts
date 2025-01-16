import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const breadcrumbStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[8],
});

export const breadcrumbImageStyle = style({
  height: '2rem',
  width: 'auto',
});

export const breadcrumbSeparatorStyle = style({
  display: 'flex',
  alignItems: 'center',
});

export const breadcrumbListStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  margin: 0,
  padding: 0,
  listStyle: 'none',
});

export const breadcrumbItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  color: vars.colors.grey900,
  fontSize: vars.typography.fontSize[22],
  fontWeight: vars.typography.fontWeight.semibold,
});

export const breadcrumbItemInactiveStyle = style({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  color: vars.colors.grey400,
  fontSize: vars.typography.fontSize[22],
  fontWeight: vars.typography.fontWeight.medium,
});
