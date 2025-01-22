import { forwardRef, ComponentPropsWithoutRef, ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { breadcrumbSeparatorStyle } from './Breadcrumb.css';

export type BreadcrumbSeparatorProps = {
  children?: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export const BreadcrumbSeparator = forwardRef<
  HTMLDivElement,
  BreadcrumbSeparatorProps
>(
  (
    {
      children = <Icon name="arrowRight" size={24} color="grey300" />,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${breadcrumbSeparatorStyle} ${className}`}
        aria-hidden="true"
        {...props}
      >
        {children}
      </div>
    );
  }
);

BreadcrumbSeparator.displayName = 'Breadcrumb.Separator';
