import { tokens, TypographyType } from '@repo/theme';
import { ComponentPropsWithoutRef } from 'react';
import { colorVar, sizeVar, textStyle, weightVar } from './Text.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

export type AllowedTags =
  | 'span'
  | 'p'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div';

export type TextProps<T extends AllowedTags> = {
  as?: T;
  color: keyof typeof tokens.colors;
  fontSize: keyof TypographyType['fontSize'];
  fontWeight: keyof TypographyType['fontWeight'];
} & ComponentPropsWithoutRef<T>;

export function Text<T extends AllowedTags = 'span'>({
  as,
  color,
  fontSize,
  fontWeight,
  ...rest
}: TextProps<T>) {
  const Component = as || 'span';

  return (
    <Component
      className={textStyle}
      style={{
        ...assignInlineVars({
          [colorVar]: tokens.colors[color],
          [sizeVar]: tokens.typography.fontSize[fontSize],
          [weightVar]: tokens.typography.fontWeight[fontWeight],
        }),
      }}
      {...rest}
    />
  );
}
