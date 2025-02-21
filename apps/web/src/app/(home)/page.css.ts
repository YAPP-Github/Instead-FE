import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const background = style({
  maxWidth: '100%',
  margin: '0 auto',
  paddingTop: '8rem',
  background:
    'linear-gradient(0deg, #F6F7FC 0%, #F6F7FC 100%), linear-gradient(180deg, #F8F8FF 0%, #F4F5F9 48.16%, #E9F0FA 84.19%)',
  overflow: 'auto',
});

export const content = style({
  display: 'flex',
  width: '100%',
  height: 'calc(100vh - 8rem)',
  paddingLeft: '40rem',
});

export const cardContent = style({
  display: 'flex',
  minWidth: '129.6rem',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '4.8rem',
  overflow: 'visible',
  margin: '0 auto',
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

export const animatedText = style({
  display: 'flex',
  alignItems: 'center',
  height: 'fit-content',
});

export const cardRow = style({
  display: 'flex',
  gap: '2.4rem',
});

export const cardColumn = style({
  width: '128rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
});

export const flexColumn = style({
  display: 'flex',
  flexDirection: 'column',
});
