'use client';

import React, {
  Children,
  ComponentPropsWithoutRef,
  forwardRef,
  isValidElement,
  ReactNode,
} from 'react';
import { accordionContentHidden } from './Accordion.css';
import { useAccordionContext } from './Accordion.context';
import { useAccordionItemContext } from './AccordionItem';

export type AccordionContentProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className = '', ...props }: AccordionContentProps, ref) => {
  const { isValueOpen } = useAccordionContext();
  const { value } = useAccordionItemContext();

  const open = isValueOpen(value);

  const mappedChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      // 문자열, 숫자, Fragment 등은 그대로 반환
      return child;
    }

    return <div key={index}>{child}</div>;
  });

  return (
    <div
      ref={ref}
      className={
        open ? ` ${className}` : `${accordionContentHidden} ${className}`
      }
      {...props}
    >
      {mappedChildren}
    </div>
  );
});

AccordionContent.displayName = 'AccordionContent';
