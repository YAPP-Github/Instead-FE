// src/Button.css.ts
import { style } from '@vanilla-extract/css';

export const button = style({
  backgroundColor: '#3498db',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  transition: 'background-color 0.3s',

  ':hover': {
    backgroundColor: '#2980b9',
  },

  ':active': {
    backgroundColor: '#1c5980',
  },
});
