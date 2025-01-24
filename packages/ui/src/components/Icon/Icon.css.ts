import { style, createVar, globalStyle } from '@vanilla-extract/css';

export const strokeColor = createVar();
export const fillColor = createVar();

export const parent = style({});

globalStyle(`.${parent} *`, {
  stroke: strokeColor,
  fill: fillColor,
});
