import {
  forwardRef,
  ComponentPropsWithoutRef,
  ReactNode,
  Children,
  isValidElement,
  Fragment,
} from 'react';
import { breadcrumbStyle } from './Breadcrumb.css';
import { BreadcrumbSeparator } from './BreadcrumbSeparator';

export type BreadcrumbProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'nav'>;

export const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, className, ...props }, ref) => {
    const items = Children.toArray(children).filter(isValidElement);

    return (
      <nav
        ref={ref}
        className={`${breadcrumbStyle} ${className}`}
        aria-label="breadcrumb"
        {...props}
      >
        {items.map((item, index) => (
          <Fragment key={index}>
            {item}
            {index < items.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </nav>
    );
  }
);

BreadcrumbRoot.displayName = 'Breadcrumb';
