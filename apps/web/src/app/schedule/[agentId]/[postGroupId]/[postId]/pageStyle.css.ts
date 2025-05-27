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
  maxWidth: '768px',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  padding: `0 ${vars.space[16]}`,
});

export const titleSectionStyle = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: vars.space[16],
  padding: `${vars.space[24]} ${vars.space[12]}`,
});

export const contentStyle = style({
  width: '100%',
  padding: `0 ${vars.space[12]}`,
});

export const imageWrapperStyle = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[10],
});

export const imageStyle = style({
  width: '100%',
  height: 'auto',
  borderRadius: vars.borderRadius[16],
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
