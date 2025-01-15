'use client';

import Lottie, { LottieComponentProps } from 'lottie-react';
import { lotties } from './assets';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import {
  heightVar,
  lottieAnimationStyles,
  widthVar,
} from './LottieAnimation.css';

export type LottieAnimationProps = LottieComponentProps & {
  animationData: keyof typeof lotties;
  loop?: boolean;
  autoplay?: boolean;
  width?: string;
  height?: string;
  className?: string;
  'aria-label'?: string;
};

/**
 * @property {keyof typeof lotties} animationData - 사용할 로티 애니메이션
 * @property {boolean} [loop=true] - 애니메이션을 반복할지 여부
 * @property {boolean} [autoplay=true] - 자동으로 애니메이션 재생을 시작할지 여부
 * @property {string} [width='auto'] - 너비
 * @property {string} [height='auto'] - 높이
 * @property {string} [className] - 추가적인 CSS 클래스
 * @property {LottieComponentProps} [otherProps] - lottie-react의 prop
 */
export function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  width = '100%',
  height = '100%',
  className,
  'aria-label': ariaLabel,
  ...rest
}: LottieAnimationProps) {
  return (
    <Lottie
      animationData={lotties[animationData]}
      loop={loop}
      autoplay={autoplay}
      className={`${lottieAnimationStyles} ${className || ''}`}
      style={{
        ...assignInlineVars({
          [widthVar]: width,
          [heightVar]: height,
        }),
      }}
      role="img"
      aria-label={ariaLabel}
      {...rest}
    />
  );
}
