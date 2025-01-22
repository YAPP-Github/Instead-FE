import { Icon as BaseIcon, IconProps } from '@/components';
import * as styles from './Icon.css';

export type ModalIconProps = IconProps;

export function Icon({ size = 80, ...props }: ModalIconProps) {
  return (
    <div className={styles.icon}>
      <BaseIcon size={size} {...props} />
    </div>
  );
}

Icon.displayName = 'Modal.Icon';
