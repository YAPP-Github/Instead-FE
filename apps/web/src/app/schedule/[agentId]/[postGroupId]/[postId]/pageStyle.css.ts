import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const mainStyle = style({
  width: '100%',
  position: 'relative',
  paddingTop: '8rem',
  display: 'flex',
  justifyContent: 'center',
});

export const contentWrapperStyle = style({
  maxWidth: '76.8rem',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: `0 ${vars.space[16]}`,
});

export const buttonWrapperStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[8],
});

export const breadcrumbItemStyle = style({
  maxWidth: '12rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  height: 'fit-content',
});

export const dropdownItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  padding: '1.2rem 1.6rem',
});
