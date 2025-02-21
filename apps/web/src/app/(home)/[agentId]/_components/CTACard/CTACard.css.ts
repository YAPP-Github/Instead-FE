import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const card = style({
  width: '100%',
  minWidth: '62.8rem',
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: vars.borderRadius[24],
  backgroundColor: vars.colors.grey,
  cursor: 'pointer',

  ':hover': {
    boxShadow: '0rem 1.6rem 1.6rem 0rem rgba(74, 98, 139, 0.10)',
  },
});

export const createCardText = style({
  display: 'flex',
  flexDirection: 'column',
  padding: '2.8rem 3.2rem',
  gap: '2.7rem',
});

export const createImage = style({
  width: '100%',
  height: 'auto',
  aspectRatio: '30 / 17',
  maxWidth: '30rem',
  maxHeight: '17rem',
  borderRadius: vars.borderRadius[24],
  objectFit: 'cover',
});
