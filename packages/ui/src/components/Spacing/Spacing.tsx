import { tokens } from '@repo/theme';
import { directionVar, sizeVar, spacingStyle } from './Spacing.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

export type SpacingProps = React.HTMLAttributes<HTMLDivElement> & {
  direction?: 'row' | 'column';
  size: keyof typeof tokens.spacing;
};

export function Spacing({ direction = 'column', size, ...rest }: SpacingProps) {
  const sizeValue =
    direction === 'row'
      ? tokens.spacing[size]
      : direction === 'column'
        ? tokens.spacing[size]
        : 'auto';

  return (
    <div
      className={spacingStyle}
      style={{
        ...assignInlineVars({
          [directionVar]: direction,
          [sizeVar]: sizeValue,
        }),
      }}
      role="separator"
      aria-label="space"
      {...rest}
    />
  );
}
