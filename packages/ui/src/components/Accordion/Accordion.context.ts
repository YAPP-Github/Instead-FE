'use client';
import { createContext, useContext } from 'react';

/**
 * Accordion 전체에서 공유할 정보
 */
export interface AccordionContextValue {
  /** single | multiple 모드 */
  type: 'single' | 'multiple';
  /** 현재 열려 있는 item value들의 배열 */
  openValues: string[];
  /** 특정 value를 열거나 닫는 함수 */
  toggleValue: (value: string) => void;
  /** 특정 value가 현재 열려 있는지 확인하는 함수 */
  isValueOpen: (value: string) => boolean;
}

/** 실제 Context 객체 생성 */
export const AccordionContext = createContext<AccordionContextValue | null>(
  null
);

/** Context를 안전하게 사용하기 위한 커스텀 훅 */
export function useAccordionContext(): AccordionContextValue {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      'Accordion compound components must be used inside <Accordion/>'
    );
  }
  return context;
}
