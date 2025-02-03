'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  ComponentPropsWithoutRef,
} from 'react';
import { accordionItem } from './Accordion.css';

export type AccordionItemProps = {
  value: string;
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

type AccordionItemContextValue = {
  value: string;
};

const AccordionItemContext = createContext<AccordionItemContextValue | null>(
  null
);

function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) {
    throw new Error('AccordionItem must be used within <Accordion/>');
  }
  return ctx;
}

export { useAccordionItemContext };

export function AccordionItem({
  value,
  children,
  className = '',
  ...props
}: AccordionItemProps) {
  const itemContextValue = useMemo(() => ({ value }), [value]);

  return (
    <AccordionItemContext.Provider value={itemContextValue}>
      <div className={`${accordionItem} ${className}`} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}
