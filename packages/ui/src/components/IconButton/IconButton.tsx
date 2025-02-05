import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { iconButtonStyle } from './IconButton.css';
import { Icon, IconProps } from '../Icon/Icon';

export type IconButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> & {
  icon: IconProps['name'];
  iconType?: IconProps['type'];
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, iconType = 'fill', className = '', ...rest }, ref) => (
    <button ref={ref} className={`${iconButtonStyle} ${className}`} {...rest}>
      <Icon name={icon} type={iconType} />
    </button>
  )
);

IconButton.displayName = 'IconButton';
