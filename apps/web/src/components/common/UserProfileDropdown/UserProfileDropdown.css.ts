import { style } from '@vanilla-extract/css';

export const imageStyle = style({
  width: '4rem',
  height: '4rem',
  borderRadius: '50%',
  backgroundColor: 'grey200',
});

export const dropdownItemStyle = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
});
