import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const mainStyle = style({
  position: 'relative',
  minWidth: '144rem', // 100rem + 44rem
  minHeight: '100vh',
  padding: '8rem 0 12rem',
  display: 'flex',
  overflowX: 'auto',
  backgroundColor: vars.colors.grey,
});

export const contentWrapperStyle = style({
  position: 'relative',
  //marginLeft: '44rem',
  flex: 1,
  padding: `0 ${vars.space[40]}`,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
});

export const titleSectionStyle = style({
  width: '100%',
  marginBottom: vars.space[32],
});

export const dndSectionStyle = style({
  width: '100rem',
  position: 'relative',
  margin: '0 auto',
});

export const buttonWrapperStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space[8],
});

export const sideBarContentWrapperStyle = style({
  position: 'fixed',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[40],
});

export const dropdownWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[16],
});

export const breadcrumbItemStyle = style({
  maxWidth: '120px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
