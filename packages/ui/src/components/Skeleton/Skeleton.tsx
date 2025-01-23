import { tokens } from '@repo/theme';
import { heightVar, radiusVar, skeletonStyle, widthVar } from './Skeleton.css';
import { assignInlineVars } from '@vanilla-extract/dynamic';

export type SkeletonProps = {
  width?: string;
  height?: string;
  radius?: keyof typeof tokens.spacing;
};

/**
 *
 * @component
 * @param {SkeletonProps} props - 스켈레톤 컴포넌트의 속성
 * @param {string} [props.width='100%'] - 스켈레톤의 너비
 * @param {string} [props.height='100%'] - 스켈레톤의 높이
 * @param {keyof typeof tokens.spacing} [props.radius] - 스켈레톤의 테두리 반경
 *
 *
 * @example
 * ```tsx
 * <Skeleton width="32rem" height="16em" radius={16} />
 * ```
 */
export function Skeleton({
  width = '100%',
  height = '100%',
  radius,
}: SkeletonProps) {
  const radiusValue = radius ? `${radius}rem` : '100%';

  return (
    <div
      className={skeletonStyle}
      style={{
        ...assignInlineVars({
          [widthVar]: width,
          [heightVar]: height,
          [radiusVar]: radiusValue,
        }),
      }}
    />
  );
}

Skeleton.displayName = 'Skeleton';
