'use client';

import React, {
  Children,
  ComponentPropsWithoutRef,
  isValidElement,
  ReactNode,
} from 'react';
import { accordionContentHidden, accordionContentItem } from './Accordion.css';
import { useAccordionContext } from './Accordion.context';
import { useAccordionItemContext } from './AccordionItem';

export type AccordionContentProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export function AccordionContent({
  children,
  className = '',
  ...props
}: AccordionContentProps) {
  const { isValueOpen } = useAccordionContext();
  const { value } = useAccordionItemContext();

  const open = isValueOpen(value);

  const mappedChildren = Children.map(children, (child, index) => {
    if (!isValidElement(child)) {
      // 문자열, 숫자, Fragment 등은 그대로 반환
      return child;
    }

    return (
      <div key={index} className={accordionContentItem}>
        {child}
      </div>
    );
  });

  return (
    <div
      className={
        open ? ` ${className}` : `${accordionContentHidden} ${className}`
      }
      {...props}
    >
      {mappedChildren}
    </div>
  );
}

AccordionContent.displayName = 'AccordionContent';
