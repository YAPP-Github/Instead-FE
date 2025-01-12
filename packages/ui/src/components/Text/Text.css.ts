import { createVar, style } from '@vanilla-extract/css';

export const sizeVar = createVar();
export const weightVar = createVar();
export const colorVar = createVar();

export const textStyle = style({
  fontSize: sizeVar,
  fontWeight: weightVar,
  color: colorVar,
});
