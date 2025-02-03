'use client';

import { AccordionRoot } from './AccordionRoot';
import { AccordionItem } from './AccordionItem';
import { AccordionContent } from './AccordionContent';
import { AccordionTrigger } from './AccordionTrigger';

/**
 * @example
 *
 * Accordion 컴포넌트 사용 예시입니다.
 *
 */
export const Accordion = Object.assign(AccordionRoot, {
  Item: AccordionItem,
  Content: AccordionContent,
  Trigger: AccordionTrigger,
});

export type { AccordionProps } from './AccordionRoot';
export type { AccordionItemProps } from './AccordionItem';
export type { AccordionContentProps } from './AccordionContent';
export type { AccordionTriggerProps } from './AccordionTrigger';
