import { FC, SVGProps } from 'react';
import { icons } from './assets';
import { tokens } from '@repo/theme';
import * as styles from './Icon.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

type IconName = keyof typeof icons;

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  fill?: keyof typeof tokens.colors;
  stroke?: keyof typeof tokens.colors;
}

export const Icon: FC<IconProps> = ({
  name,
  stroke,
  fill,
  ...rest
}: IconProps) => {
  const SVG = icons[name] as FC<SVGProps<SVGSVGElement>>;

  const resolvedFill = fill ? tokens.colors[fill] : 'transparent';
  const resolvedStroke = stroke ? tokens.colors[stroke] : 'transparent';

  return (
    <SVG
      className={styles.parent}
      style={JSON.parse(
        JSON.stringify(
          assignInlineVars({
            [styles.strokeColor]: resolvedStroke,
            [styles.fillColor]: resolvedFill,
          })
        )
      )}
      {...rest}
    />
  );
};
