import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { iconButtonStyle } from './IconButton.css';
import { Icon, IconProps } from '../Icon/Icon';

export type IconButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> & {
  icon: IconProps['name'];
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, className = '', ...rest }, ref) => (
    <button ref={ref} className={`${iconButtonStyle} ${className}`} {...rest}>
      <Icon name={icon} />
    </button>
  )
);

IconButton.displayName = 'IconButton';
