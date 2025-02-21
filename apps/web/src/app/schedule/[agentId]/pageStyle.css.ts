import { style } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const mainStyle = style({
  position: 'relative',
  minHeight: '100vh',
  padding: '8rem 0 12rem',
  display: 'flex',
  overflowX: 'auto',
  backgroundColor: vars.colors.grey,
});

export const image = style({
  borderRadius: '100%',
  width: '4rem',
  height: '4rem',
  backgroundColor: vars.colors.grey25,
  border: `0.1rem solid ${vars.colors.grey200}`,
  objectFit: 'cover',
});

export const dropdownItem = style({
  padding: '1.45rem 1.6rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});

export const contentWrapperStyle = style({
  position: 'relative',
  flex: 1,
  padding: `0 ${vars.space[40]}`,
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '44rem',
  //maxWidth: '144rem',
});

export const dndSectionStyle = style({
  width: '100rem',
  position: 'relative',
  margin: '0 auto',
});
