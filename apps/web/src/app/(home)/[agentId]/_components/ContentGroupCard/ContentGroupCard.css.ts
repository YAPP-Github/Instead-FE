import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const card = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '2.4rem',
  borderRadius: vars.borderRadius[24],
  backgroundColor: vars.colors.grey,
  padding: '2.4rem 3.2rem',
  cursor: 'pointer',
});

export const leftText = style({
  display: 'flex',
  gap: '0.8rem',
});

export const items = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '2rem',
});

export const contentGroupItem = style({
  width: '100%',
  maxWidth: '39.2rem',
});

export const contentGroupImage = style({
  width: '100%',
  height: 'auto',
  minWidth: '20rem',
  aspectRatio: '392 / 224',
  objectFit: 'cover',
  borderRadius: vars.borderRadius[16],
});

export const contentGroupText = style({
  padding: '1.6rem 1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
});

export const content = style({
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
});

export const dropdownItem = style({
  display: 'flex',
  padding: '1.45rem 1.6rem',
  gap: '1rem',
});

export const dropdownWrapper = style({
  opacity: 0,
  transition: 'opacity 0.3s ease',

  selectors: {
    [`${contentGroupItem}:hover &`]: {
      opacity: 1,
    },
  },
});
