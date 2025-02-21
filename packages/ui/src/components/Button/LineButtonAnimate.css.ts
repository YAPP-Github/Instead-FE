import { vars } from '@repo/theme';
import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const wrapper = recipe({
  base: {
    width: 'fit-content',
    height: 'fit-content',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '1.2rem',
  },
  variants: {
    size: {
      large: {
        borderRadius: vars.borderRadius[12],
      },
      small: {
        borderRadius: vars.borderRadius[8],
      },
    },
  },
});

export const gradient = style({
  width: '600%',
  height: '600%',
  position: 'absolute',
  top: '-250%',
  left: '-250%',
  transform: 'translate(-50%, -50%)',
  borderRadius: vars.borderRadius[12],
  backgroundImage: `linear-gradient(115deg, #B68AE7 44.22%, #3348D6 48.73%, #9290DC 51.48%, #9290DC 55.15%);`,
  backgroundOrigin: 'border-box',
  backgroundClip: 'padding-box, border-box',
  overflow: 'visible',
});
