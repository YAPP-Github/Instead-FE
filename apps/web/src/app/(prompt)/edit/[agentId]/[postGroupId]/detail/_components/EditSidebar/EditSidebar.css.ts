import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';

export const sidebarWrapper = style({
  width: '52rem',
  height: 'fit-content',
  overflow: 'hidden',
  boxSizing: 'border-box',
  flexShrink: '0',
  background:
    'linear-gradient(174deg, rgba(255, 255, 255, 0.55) -11.84%, rgba(243, 244, 249, 0.55) 29.91%, rgba(231, 232, 251, 0.55) 100%)',
});

export const breadcrumbWrapper = style({
  height: '8rem',
  padding: '2.4rem',
  flexShrink: 0,
});

export const contentWrapper = style({
  padding: '0rem 6.4rem 3.2rem 6.4rem',
  height: 'calc(100vh - 8rem)',
});

export const accordionTrigger = style({
  padding: '1.2rem 1.6rem',
  height: 'fit-content',
  gap: 0,
});

export const accordionContent = style({
  maxHeight: 'calc(100vh - 24.8rem)',
  overflowY: 'scroll',
});

export const generateTrigger = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

export const dndItem = style({
  selectors: {
    '&:not(:last-child)': {
      borderBottom: `0.1rem solid ${vars.colors.grey100}`,
    },
  },
});

export const breadcrumbItemStyle = style({
  maxWidth: '12rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});
