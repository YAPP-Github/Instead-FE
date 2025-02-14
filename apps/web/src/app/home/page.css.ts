import { tokens } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const background = style({
  maxWidth: '100%',
  minHeight: '100vh',
  margin: '0 auto',
  background:
    'linear-gradient(0deg, #F6F7FC 0%, #F6F7FC 100%), linear-gradient(180deg, #F8F8FF 0%, #F4F5F9 48.16%, #E9F0FA 84.19%)',
  overflow: 'auto',
});

export const image = style({
  borderRadius: '100%',
  width: '4rem',
  height: '4rem',
  backgroundColor: tokens.colors.grey25,
  border: `0.1rem solid ${tokens.colors.grey200}`,
  objectFit: 'cover',
});

export const dropdownItem = style({
  padding: '1.45rem 1.6rem',
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});
