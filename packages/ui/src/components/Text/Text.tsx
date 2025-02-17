import { vars, TypographyType } from '@repo/theme';
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
  color?: keyof typeof vars.colors;
  fontSize?: keyof TypographyType['fontSize'];
  fontWeight?: keyof TypographyType['fontWeight'];
} & ComponentPropsWithoutRef<T>;

export function Text<T extends AllowedTags = 'span'>({
  as,
  color,
  fontSize = 14,
  fontWeight = 'medium',
  className = '',
  ...rest
}: TextProps<T>) {
  const Component = as || 'span';

  return (
    <Component
      className={`${textStyle} ${className}`}
      style={{
        ...assignInlineVars({
          [colorVar]: color ? vars.colors[color] : 'inherit',
          [sizeVar]: vars.typography.fontSize[fontSize],
          [weightVar]: vars.typography.fontWeight[fontWeight],
        }),
      }}
      {...rest}
    />
  );
}
