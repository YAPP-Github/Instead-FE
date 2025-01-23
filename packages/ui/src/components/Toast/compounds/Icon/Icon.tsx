import { Icon } from '@repo/ui';
import type { IconProps } from '@repo/ui';
import { ToastType } from '../../Toast';

export type ToastIconProps = Omit<IconProps, 'name'> & {
  toastType?: ToastType;
};

export function ToastIcon({
  toastType = 'default',
  ...restProps
}: ToastIconProps) {
  const iconName = (() => {
    switch (toastType) {
      case 'success':
        return 'check';
      case 'error':
        return 'notice';
      case 'default':
        return undefined;
    }

    toastType satisfies never;
  })();

  if (!iconName) {
    return null;
  }

  const iconColor = (() => {
    switch (toastType) {
      case 'success':
        return 'violet200';
      case 'error':
        return 'warning300';
      case 'default':
        return undefined;
    }

    toastType satisfies never;
  })();

  return (
    <Icon
      type="fill"
      size={24}
      name={iconName}
      color={iconColor}
      {...restProps}
    />
  );
}
