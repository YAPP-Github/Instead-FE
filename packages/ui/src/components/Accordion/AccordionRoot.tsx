'use client';

import { ComponentPropsWithoutRef, ReactNode } from 'react';
import React, { useState, useMemo, useCallback } from 'react';
import { accordionRoot } from './Accordion.css';
import { AccordionContext } from './Accordion.context';

export type AccordionType = 'single' | 'multiple';

export type AccordionProps = {
  /**
   * 하나의 아이템만 열 수 있는 single 모드,
   * 여러 아이템을 동시에 열 수 있는 multiple 모드
   */
  type?: AccordionType;
  /**
   * 기본으로 열어놓고 싶은 item의 value.
   * 'single' 모드이면 단일 string 또는 string[]
   * 'multiple' 모드이면 string[]
   */
  defaultValue?: string | string[];
  /** 자식으로 AccordionItem 컴포넌트들 */
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export function AccordionRoot({
  type = 'single',
  defaultValue = [],
  children,
  className = '',
  ...props
}: AccordionProps) {
  // 초기 열림 상태 결정
  const initialOpenValues = useMemo(() => {
    if (type === 'single') {
      return Array.isArray(defaultValue)
        ? defaultValue.slice(0, 1) // 여러 값이 들어와도 첫 번째만
        : [defaultValue];
    }
    // multiple 모드
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  }, [type, defaultValue]);

  // 비제어: 내부 state로 열림 상태 관리
  const [openValues, setOpenValues] = useState<string[]>(initialOpenValues);

  // 토글 함수
  const toggleValue = useCallback(
    (value: string) => {
      setOpenValues((prev) => {
        if (type === 'single') {
          // 이미 열려있으면 닫고, 아니면 그 아이템만
          return prev.includes(value) ? [] : [value];
        } else {
          // multiple
          if (prev.includes(value)) {
            return prev.filter((v) => v !== value);
          }
          return [...prev, value];
        }
      });
    },
    [type]
  );

  // 열려 있는지 여부 판단
  const isValueOpen = useCallback(
    (value: string) => openValues.includes(value),
    [openValues]
  );

  // Context에 주입할 값
  const contextValue = useMemo(
    () => ({
      type,
      openValues,
      toggleValue,
      isValueOpen,
    }),
    [type, openValues, toggleValue, isValueOpen]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div className={`${accordionRoot} ${className}`} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

AccordionRoot.displayName = 'AccordionRoot';
