import { tokens } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  width: '100%',
  height: '13.4rem',
  padding: '1.2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  borderRadius: `${tokens.radius[10]}`,
  ':hover': {
    backgroundColor: `${tokens.colors.grey25}`,
  },
});

export const promptText = style({
  width: '100%',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginRight: '0.8rem',
});
