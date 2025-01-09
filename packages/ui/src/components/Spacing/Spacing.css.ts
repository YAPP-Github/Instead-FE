import { createVar, style } from '@vanilla-extract/css';

export const sizeVar = createVar();
export const directionVar = createVar();

export const spacingStyle = style({
  display: 'flex',
  flexDirection: directionVar,
  width: sizeVar,
  height: sizeVar,
});
