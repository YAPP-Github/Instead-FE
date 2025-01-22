import { Icon } from '../../../Icon/Icon';
import type { IconProps } from '../../../Icon/Icon';
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
      default:
        return null;
    }
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
    }
  })();

  return <Icon type="fill" name={iconName} color={iconColor} {...restProps} />;
}
