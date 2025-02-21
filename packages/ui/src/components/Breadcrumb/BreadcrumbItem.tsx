import { Slot } from '@radix-ui/react-slot';
import { forwardRef, ReactNode, ComponentPropsWithoutRef } from 'react';
import { Text } from '../Text';
import { breadcrumbItemStyle } from './Breadcrumb.css';

export type BreadcrumbItemProps = {
  children: ReactNode;
  active?: boolean;
  asChild?: boolean;
} & ComponentPropsWithoutRef<'span'>;

export const BreadcrumbItem = forwardRef<HTMLSpanElement, BreadcrumbItemProps>(
  ({ children, className = '', active, asChild, ...props }, ref) => {
    const Component = asChild ? Slot : 'span';

    return (
      <Component ref={ref} className={`${breadcrumbItemStyle}`} {...props}>
        <Text
          fontSize={22}
          color={active ? 'grey900' : 'grey400'}
          fontWeight={active ? 'semibold' : 'medium'}
          className={`${className}`}
        >
          {children}
        </Text>
      </Component>
    );
  }
);

BreadcrumbItem.displayName = 'Breadcrumb.Item';
