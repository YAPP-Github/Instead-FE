import { style } from '@vanilla-extract/css';

export const sidebarWrapper = style({
  height: '100vh',
  width: '52rem',
  background:
    'linear-gradient(174deg, rgba(255, 255, 255, 0.55) -11.84%, rgba(243, 244, 249, 0.55) 29.91%, rgba(231, 232, 251, 0.55) 100%)',
});

export const breadcrumbWrapper = style({
  height: '8rem',
  padding: '2.4rem',
});

export const contentWrapper = style({
  padding: '0rem 6.4rem 3.2rem 6.4rem',
});

export const accordionTrigger = style({
  padding: '1.2rem 1.6rem',
});
