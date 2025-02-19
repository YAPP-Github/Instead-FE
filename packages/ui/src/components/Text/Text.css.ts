import { createVar, style } from '@vanilla-extract/css';

export const sizeVar = createVar();
export const weightVar = createVar();
export const colorVar = createVar();

export const textStyle = style({
  whiteSpace: 'pre-line',
  fontSize: sizeVar,
  fontWeight: weightVar,
  color: colorVar,
  lineHeight: '150%', // TODO 추후 분리
});
