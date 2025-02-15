import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const wrapper = style({
  display: 'flex',
  gap: '2rem',
  alignItems: 'center',
  padding: '1.6rem 1.2rem',
  cursor: 'pointer',
  ':hover': {
    marginLeft: '0.8rem',
  },
});

export const image = style({
  borderRadius: '100%',
  width: '6rem',
  height: '6rem',
  backgroundColor: vars.colors.grey25,
  border: `0.1rem solid ${vars.colors.grey200}`,
  objectFit: 'cover',
});

export const emptyImage = style({
  borderRadius: '100%',
  width: '6rem',
  height: '6rem',
  border: `0.1rem solid ${vars.colors.grey200}`,
  backgroundColor: vars.colors.grey25,
  flexShrink: 0,
});

export const agentPlanBadge = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '0.4rem',
});

export const textWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});
