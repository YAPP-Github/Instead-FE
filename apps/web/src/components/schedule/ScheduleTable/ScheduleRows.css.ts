import { style } from '@vanilla-extract/css';

export const draggableOverlay = style({
  position: 'absolute',
  top: '4rem',
  right: 0,
  width: '55rem',
});

export const itemsContainer = style({
  display: 'flex',
  flexDirection: 'column',
});
