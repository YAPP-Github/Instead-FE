import { vars } from '@repo/theme';
import { keyframes, style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

const rotate = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
});

const dash = keyframes({
  '0%': {
    strokeDasharray: '17.6 45.2',
  },
  '60%': {
    strokeDasharray: '5 57.8',
  },
  '100%': {
    strokeDasharray: '17.6 45.2',
  },
});

export const spinner = style({
  width: '3.2rem',
  height: '3.2rem',
  padding: '0.4rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const spinnerRecipe = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  variants: {
    size: {
      icon: {
        width: '2.4rem',
        height: '2.4rem',
      },
      small: {
        width: '3.2rem',
        height: '3.2rem',
        padding: '0.4rem',
      },
      large: {
        width: '4.0rem',
        height: '4.0rem',
        padding: '0.5rem',
      },
    },
  },
});

export const svg = style({
  animation: `${rotate} 0.8s linear infinite`,
  width: '100%',
  height: '100%',
});

export const circleRecipe = recipe({
  base: {
    fill: 'none',
    stroke: '#000',
    strokeWidth: '2.5',
    strokeLinecap: 'round',
    strokeDasharray: '17.6 45.2',
    animation: `${dash} 0.8s ease-in-out infinite`,
  },
  variants: {
    color: {
      black: {
        stroke: `${vars.colors.grey1000}`,
      },
      white: {
        stroke: `${vars.colors.grey}`,
      },
      line: {
        stroke: `${vars.colors.primary800}`,
      },
      icon: {
        stroke: `${vars.colors.grey300}`,
      },
    },
  },
});
