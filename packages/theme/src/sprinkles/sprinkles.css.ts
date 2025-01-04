import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { vars } from '../themes';

const colorProperties = defineProperties({
  properties: {
    color: vars.colors,
    background: vars.colors,
    borderColor: vars.colors,
  },
  shorthands: {
    bg: ['background'],
    border: ['borderColor'],
  },
});

const spaceProperties = defineProperties({
  properties: {
    padding: vars.space,
    margin: vars.space,
    gap: vars.space,
    borderRadius: vars.borderRadius,
  },
});

const typographyProperties = defineProperties({
  properties: {
    fontSize: vars.typography.fontSize,
    fontWeight: vars.typography.fontWeight,
  },
});

export const sprinkles = createSprinkles(
  colorProperties,
  spaceProperties,
  typographyProperties
);

export type Sprinkles = Parameters<typeof sprinkles>[0];
