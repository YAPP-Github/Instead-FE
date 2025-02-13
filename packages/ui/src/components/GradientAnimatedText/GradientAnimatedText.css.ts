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
});
