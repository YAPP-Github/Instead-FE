import { FC, SVGProps } from 'react';
// import { icons } from './assets';
import { tokens } from '@repo/theme';
import * as styles from './Icon.css';

// type IconName = keyof typeof icons;

type Colors = typeof tokens.colors;

type ColorType =
  | `primary.${keyof Colors['primary']}`
  | `semantic.${keyof Colors['semantic']}`
  | `grey.${keyof Colors['grey']}`;

interface IconProps extends SVGProps<SVGSVGElement> {
  // name: IconName;
  fill?: ColorType;
  stroke?: ColorType;
}

export const Icon: FC<IconProps> = ({
  name,
  stroke,
  fill,
  ...rest
}: IconProps) => {
  // const SVG = icons[name] as FC<SVGProps<SVGSVGElement>>;

  // const getColor = (color?: ColorType): string => {
  //   if (!color) return 'currentColor';
  //   const [category, key] = color.split('.') as [keyof Colors, string];
  //   return tokens.colors[category][key as keyof Colors[typeof category]];
  // };

  // const resolvedFill = getColor(fill) || 'currentColor';
  // const resolvedStroke = getColor(stroke) || 'currentColor';

  // console.log(resolvedFill, resolvedStroke, '🩷');

  return (
    <div className={styles.parent}>
      {/* <SVG {...rest} /> */}
      hi
    </div>
  );
};
