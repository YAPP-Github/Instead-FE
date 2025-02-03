'use client';

import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import { accordionTrigger } from './Accordion.css';
import { useAccordionContext } from './Accordion.context';
import { useAccordionItemContext } from './AccordionItem';
import { Icon } from '@repo/ui/Icon';

export type AccordionTriggerProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export function AccordionTrigger({
  children,
  className = '',
  ...props
}: AccordionTriggerProps) {
  const { toggleValue, isValueOpen } = useAccordionContext();
  const { value } = useAccordionItemContext();

  const handleClick = () => toggleValue(value);
  const open = isValueOpen(value);

  return (
    <button
      className={`${accordionTrigger} ${className}`}
      onClick={handleClick}
      {...props}
    >
      {open ? (
        <Icon name={'arrowFillTop'} color="grey500" size="2rem" />
      ) : (
        <Icon name={'arrowFillBottom'} color="grey500" size="2rem" />
      )}
      {children}
    </button>
  );
}
