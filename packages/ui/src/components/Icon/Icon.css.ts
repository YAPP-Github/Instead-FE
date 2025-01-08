import { style, createVar } from '@vanilla-extract/css';

export const strokeColor = createVar();
export const fillColor = createVar();

export const parent = style({
  backgroundColor: '#3498db',
  width: '100px',
  height: '100px',
  padding: '10px 20px',
});

// globalStyle(`.${parent} path`, {
//   stroke: `var(${strokeColor})`,
//   fill: `var(${fillColor})`,
//   backgroundColor: '#ffdafd',
// });
