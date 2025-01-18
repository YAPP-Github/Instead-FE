import { createVar, style } from '@vanilla-extract/css';

export const widthVar = createVar();
export const heightVar = createVar();

export const lottieAnimationStyles = style({
  width: widthVar,
  height: heightVar,
  overflow: 'hidden',
  display: 'inline-block',
});
