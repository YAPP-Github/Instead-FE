import { Icon } from '@repo/ui';
import type { IconProps } from '@repo/ui';
import { ToastType } from '../../Toast';
import { isNil } from '../../../../utils';

export type ToastIconProps = {
  toastType: ToastType;
} & Omit<IconProps, 'name' | 'color' | 'type'>;

function getToastIconProps(
  toastType?: ToastType
): Pick<IconProps, 'name' | 'color' | 'type'> | undefined {
  switch (toastType) {
    case 'success':
      return {
        name: 'check',
        color: 'violet200',
        type: 'fill',
      };
    case 'error':
      return {
        name: 'notice',
        color: 'warning300',
        type: 'fill',
      };
    case 'default':
      return undefined;
    case undefined:
      return undefined;
  }
  toastType satisfies never;
}

export function ToastIcon({ toastType, size = 24, ...props }: ToastIconProps) {
  const iconProps = getToastIconProps(toastType);
  if (isNil(iconProps)) {
    return null;
  }

  return <Icon size={size} {...iconProps} {...props} />;
}
