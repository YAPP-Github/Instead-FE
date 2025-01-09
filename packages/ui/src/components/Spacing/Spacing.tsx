import { FC } from 'react';
import { tokens } from '@repo/theme';
import { directionVar, sizeVar, spacingStyle } from './Spacing.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

interface SpacingProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'row' | 'column';
  size: keyof typeof tokens.spacing;
}

export const Spacing: FC<SpacingProps> = ({
  direction = 'column',
  size,
  ...rest
}: SpacingProps) => {
  const sizeValue =
    direction === 'row'
      ? tokens.spacing[size]
      : direction === 'column'
        ? tokens.spacing[size]
        : 'auto';

  return (
    <div
      className={spacingStyle}
      style={JSON.parse(
        JSON.stringify(
          assignInlineVars({
            [directionVar]: direction,
            [sizeVar]: sizeValue,
          })
        )
      )}
      {...rest}
    />
  );
};
