import { Icon } from '@repo/ui';
import type { IconProps } from '@repo/ui';
import { tokens } from '@repo/theme';
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
        return tokens.colors.green200;
      case 'error':
        return tokens.colors.warning300;
    }
  })();

  return <Icon type="fill" name={iconName} color={iconColor} {...restProps} />;
}
