import { createVar, style, keyframes } from '@vanilla-extract/css';

export const widthVar = createVar();
export const heightVar = createVar();
export const radiusVar = createVar();

const shimmer = keyframes({
  '0%': {
    left: '-150%',
  },
  '80%': {
    left: '150%',
  },
  '100%': {
    left: '150%',
  },
});

export const skeletonStyle = style({
  borderRadius: radiusVar,
  width: widthVar,
  height: heightVar,

  backgroundColor: '#EFEFF7',
  position: 'relative',
  overflow: 'hidden',

  '::after': {
    content: '',
    display: 'block',
    position: 'absolute',
    top: 0,
    left: '-150%',
    width: '70%',
    height: '100%',
    background:
      'linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.6) 30%, rgba(255, 255, 255, 0.6)70%,transparent 100%)',
    animation: `${shimmer} 1.5s infinite`,
    transform: 'skewY(0deg)',
  },
});
