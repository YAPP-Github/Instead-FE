import { ComponentPropsWithoutRef, forwardRef } from 'react';
import { iconButtonStyle } from './IconButton.css';
import { Icon, IconProps } from '../Icon/Icon';
import { Spinner } from '../Spinner';

export type IconButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'children'
> & {
  icon: IconProps['name'];
  iconType?: IconProps['type'];
  isLoading?: boolean;
};

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { icon, iconType = 'fill', className = '', isLoading = false, ...rest },
    ref
  ) => (
    <button ref={ref} className={`${iconButtonStyle} ${className}`} {...rest}>
      {isLoading ? (
        <>
          <Spinner color="icon" size="icon" />
        </>
      ) : (
        <Icon name={icon} type={iconType} />
      )}
    </button>
  )
);

IconButton.displayName = 'IconButton';
