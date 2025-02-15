import { SVGProps } from 'react';
import { icons } from './assets';
import { vars } from '@repo/theme';
import * as styles from './Icon.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

export type IconName = keyof typeof icons;

export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  type?: 'fill' | 'stroke';
  color?: keyof typeof vars.colors;
  size?: number | string;
  'aria-label'?: string;
};

export function Icon({
  name,
  type = 'fill',
  color,
  size = '100%',
  style: iconStyle,
  'aria-label': ariaLabel,
  className = '',
  ...restProps
}: IconProps) {
  const SVG = icons[name];

  const colorStyle = {
    ...(type !== 'stroke' && {
      [styles.fillColor]: color ? vars.colors[color] : 'currentColor',
    }),
    ...(type !== 'fill' && {
      [styles.strokeColor]: color ? vars.colors[color] : 'currentColor',
    }),
  };

  return (
    <SVG
      className={`${styles.parent} ${className}`}
      style={{
        ...assignInlineVars(colorStyle),
        width: size,
        height: size,
        ...iconStyle,
      }}
      role="img"
      aria-label={ariaLabel}
      {...restProps}
    />
  );
}
