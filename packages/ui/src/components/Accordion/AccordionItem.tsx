'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  ComponentPropsWithoutRef,
  forwardRef,
} from 'react';

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

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, className = '', ...props }: AccordionItemProps, ref) => {
    const itemContextValue = useMemo(() => ({ value }), [value]);

    return (
      <AccordionItemContext.Provider value={itemContextValue}>
        <div ref={ref} className={className} {...props}>
          {children}
        </div>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItem';
