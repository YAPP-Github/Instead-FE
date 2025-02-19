import { style } from '@vanilla-extract/css';

export const droppableContainer = style({
  minHeight: 'fit-content',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
});
