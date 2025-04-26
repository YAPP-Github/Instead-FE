'use client';

import { useCallback } from 'react';
import { overlay } from 'overlay-kit';
import { Toast, Icon } from '../components';
import type { ToastProps, ToastType } from '../components/Toast/Toast';
import type { LottieAnimationProps } from '../components/LottieAnimation/LottieAnimation';
import type { IconProps } from '../components/Icon/Icon';
import { isNil, isNotNil } from '../utils';
import { DynamicLottie } from '../components/LottieAnimation/DynamicLottie';

type LottieAddon = {
  type: 'lottie';
  props: LottieAnimationProps;
};

type IconAddon = {
  type: 'icon';
  props: IconProps;
};

type ToastOptions = Partial<
  Pick<ToastProps, 'duration' | 'leftAddon' | 'toastPosition'>
> & {
  leftAddon?: LottieAddon | IconAddon;
};

const DEFAULT_DURATION = 3000;

/**
 * 토스트 메시지를 표시하기 위한 커스텀 훅
 *
 * @example
 * // 토스트 위치 설정
 * const toast = useToast();
 * toast.success('생성된 본문이 업데이트 됐어요!', {toastPosition: 'top'});
 *
 * @example
 * // 기본 성공 토스트
 * const toast = useToast();
 * toast.success('생성된 본문이 업데이트 됐어요!', {duration: 3000});
 *
 * @example
 * // 기본 에러 토스트
 * const toast = useToast();
 * toast.error('생성된 본문이 업데이트 됐어요!', {duration: 3000});
 *
 * @example
 * // 기본 default 토스트
 * const toast = useToast();
 * toast.default('생성된 본문이 업데이트 됐어요!', {duration: 3000});
 *
 * @example
 * // Lottie 애니메이션이 있는 커스텀 토스트
 * const toast = useToast();
 * toast.custom('메시지', {
 *   duration: 5000,
 *   leftAddon: {
 *     type: 'lottie',
 *     props: {
 *       animationData: 'loadingBlack',
 *       width: '2.4rem',
 *       height: '2.4rem',
 *     },
 *   },
 * });
 *
 * @example
 * // 아이콘이 있는 커스텀 토스트
 * const toast = useToast();
 * toast.custom('메시지', {
 *   duration: 5000,
 *   leftAddon: {
 *     type: 'icon',
 *     props: {
 *       name: 'twinkle',
 *       size: 24,
 *       color: 'primary600',
 *       type: 'fill',
 *     },
 *   },
 * });
 *
 */
export function useToast() {
  const show = useCallback(
    (
      text: string,
      toastType: ToastType = 'default',
      options: ToastOptions = {}
    ) => {
      return overlay.open(({ isOpen, close, unmount }) => (
        <Toast
          open={isOpen}
          onClose={close}
          onExited={unmount}
          leftAddon={
            toastType !== 'default' && <Toast.Icon toastType={toastType} />
          }
          duration={options.duration ?? DEFAULT_DURATION}
          toastPosition={options.toastPosition}
        >
          {text}
        </Toast>
      ));
    },
    []
  );

  const custom = useCallback((text: string, options: ToastOptions = {}) => {
    const leftAddonType = options.leftAddon?.type;

    const leftAddonElement = (() => {
      if (isNil(options.leftAddon)) return null;

      switch (leftAddonType) {
        case 'lottie':
          return <DynamicLottie {...options.leftAddon.props} />;
        case 'icon':
          return <Icon {...options.leftAddon.props} />;
        case undefined:
          return null;
      }
      leftAddonType satisfies never;
    })();

    return overlay.open(({ isOpen, close, unmount }) => (
      <Toast
        open={isOpen}
        onClose={close}
        onExited={unmount}
        leftAddon={leftAddonElement}
        duration={
          isNotNil(options.duration) ? options.duration : DEFAULT_DURATION
        }
        toastPosition={options.toastPosition}
      >
        {text}
      </Toast>
    ));
  }, []);

  return {
    success: (text: string, options?: ToastOptions) =>
      show(text, 'success', options),
    error: (text: string, options?: ToastOptions) =>
      show(text, 'error', options),
    default: (text: string, options?: ToastOptions) =>
      show(text, 'default', options),
    custom,
  } as const;
}
