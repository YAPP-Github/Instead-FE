import { style, keyframes } from '@vanilla-extract/css';
import { vars } from '@repo/theme';

export const mainStyle = style({
  maxWidth: '100%',
  height: '100vh',
  margin: '0 auto',
  background: 'radial-gradient(circle at 50% 0%, #D7DAFF 0%, #FFFFFF 76%)',
  overflow: 'auto',
});

export const containerStyle = style({
  maxWidth: '92rem',
  margin: '0 auto',
  width: '100%',
  minHeight: 'calc(100% + 12rem)',
  padding: vars.space[32],
  borderRadius: '2.4rem 2.4rem 0 0',
  backgroundColor: vars.colors.grey,
});

export const headerStyle = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  padding: `${vars.space[12]} ${vars.space[24]}`,
});

const flowingGradient = keyframes({
  '0%': {
    backgroundPosition: '0% 50%',
  },
  '100%': {
    backgroundPosition: '200% 50%',
  },
});

export const gradientTitleStyle = style({
  background:
    'linear-gradient(90deg, #1F3761 0%, #2646C5 10%, #615BE7 30%, #615BE7 70%, #2646C5 93%, #1F3761 97%, #1F3761 100%)',
  backgroundSize: '200% 100%',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textAlign: 'center',
  padding: `${vars.space[24]} 0`,
  animation: `${flowingGradient} 4s linear infinite`,
  backgroundRepeat: 'repeat',
});

export const contentStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '4.8rem',
});

export const sectionStyle = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space[16],
});

export const labelDiscriptionWrapperStyle = style({
  display: 'flex',
  flexDirection: 'column',
});
