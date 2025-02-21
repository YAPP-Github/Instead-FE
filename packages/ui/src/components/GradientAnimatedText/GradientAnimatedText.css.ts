import { keyframes, style } from '@vanilla-extract/css';

const flowingGradient = keyframes({
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '100%': {
    backgroundPosition: '200% 50%',
  },
});

export const gradientTitleStyle = style({
  width: 'fit-content',
  background:
    'linear-gradient(90deg, #1F3761 0%, #2646C5 10%, #615BE7 30%, #615BE7 70%, #2646C5 93%, #1F3761 97%, #1F3761 100%)',
  backgroundSize: '200% 100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  animation: `${flowingGradient} 4s linear infinite`,
  backgroundRepeat: 'repeat',
  fontSize: '2.9952rem',
  '@media': {
    'screen and (min-width: 1440px) and (max-width: 1919px)': {
      fontSize: '2.08vw',
    },
    'screen and (min-width: 1920px)': {
      fontSize: '4rem',
    },
  },
});
