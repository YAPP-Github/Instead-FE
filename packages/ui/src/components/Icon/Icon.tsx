import { SVGProps } from 'react';
import { icons } from './assets';
import { tokens } from '@repo/theme';
import * as styles from './Icon.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

export type IconName = keyof typeof icons;

export type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  type?: 'fill' | 'stroke';
  color?: (typeof tokens.colors)[keyof typeof tokens.colors];
  size?: number | string;
  'aria-label'?: string;
};

export function Icon({
  name,
  type = 'fill',
  color = tokens.colors.grey300,
  size = 24,
  style: iconStyle,
  'aria-label': ariaLabel,
  ...restProps
}: IconProps) {
  const SVG = icons[name];

  return (
    <SVG
      className={styles.parent}
      style={{
        ...assignInlineVars({
          [styles.strokeColor]: type === 'fill' ? 'none' : color,
          [styles.fillColor]: type === 'stroke' ? 'none' : color,
        }),
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
