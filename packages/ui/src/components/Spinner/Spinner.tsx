'use client';

import { forwardRef } from 'react';
import { lotties } from '../LottieAnimation/assets';
import {
  LottieAnimation,
  LottieAnimationProps,
} from '../LottieAnimation/LottieAnimation';

type LottieType = keyof typeof lotties;

const SpinnerColor: Record<'black' | 'white', LottieType> = {
  black: 'loadingBlack',
  white: 'loadingWhite',
};

export type SpinnerProps = {
  color?: keyof typeof SpinnerColor;
} & Omit<LottieAnimationProps, 'animationData'>;

/**
 * @param {SpinnerProps} props - 스피너 속성
 * @property {SpinnerColor} [color='white'] - 스피너 색상 선택
 * @property {LottieAnimationProps} [otherProps] - LottieAnimation의 props
 */
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ color = 'white', width = '4rem', height = '4rem', ...rest }) => {
    return (
      <LottieAnimation
        animationData={SpinnerColor[color]}
        width={width}
        height={height}
        {...rest}
      />
    );
  }
);

Spinner.displayName = 'Spinner';
