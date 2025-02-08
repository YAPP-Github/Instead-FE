'use client';

import {
  ComponentPropsWithoutRef,
  forwardRef,
  Ref,
  useMemo,
  useCallback,
} from 'react';
import React from 'react';
import { accordionRoot } from './Accordion.css';
import { AccordionContext } from './Accordion.context';
import { useControllableState } from './hooks/useControllableState';

export type AccordionType = 'single' | 'multiple';

// TODO 수정 예정
export type AccordionProps<T extends string = string> =
  | ({
      /** 단일 모드: type은 생략하거나 'single'로 지정 */
      type?: 'single';
      /** 단일 모드에서는 value가 T (또는 undefined) */
      value?: T | undefined;
      /** 기본값도 단일 값이어야 함 */
      defaultValue?: T | undefined;
      /** 단일 모드에서는 onValueChange 콜백에 단일 값(T) 전달 */
      onValueChange?: (value: T | undefined) => void;
    } & ComponentPropsWithoutRef<'div'> & { children: React.ReactNode })
  | ({
      /** 다중 모드: type은 반드시 'multiple' */
      type: 'multiple';
      /** 다중 모드에서는 value가 T[] */
      value?: T[];
      /** 기본값도 배열이어야 함 */
      defaultValue?: T[];
      /** 다중 모드에서는 onValueChange 콜백에 배열(T[]) 전달 */
      onValueChange?: (value: T[]) => void;
    } & ComponentPropsWithoutRef<'div'> & { children: React.ReactNode });

// 제네릭 내부 컴포넌트
function AccordionRootInner<T extends string = string>(
  {
    type = 'single',
    value: valueProp,
    onValueChange,
    defaultValue,
    children,
    className = '',
    ...props
  }: AccordionProps<T>,
  ref: Ref<HTMLDivElement>
) {
  // 내부에서 defaultValue가 없으면 모드에 따라 기본값 할당
  const resolvedDefaultValue = useMemo(() => {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    // single 모드라면 기본값은 undefined, multiple 모드라면 빈 배열로 처리
    return type === 'multiple' ? [] : undefined;
  }, [defaultValue, type]);

  // 내부 상태는 항상 T[] 형태로 관리 (단일 모드일 때도 [value] 배열로)
  const initialOpenValues = useMemo(() => {
    if (resolvedDefaultValue !== undefined) {
      if (type === 'single') {
        return Array.isArray(resolvedDefaultValue)
          ? resolvedDefaultValue.slice(0, 1)
          : [resolvedDefaultValue];
      }
      return Array.isArray(resolvedDefaultValue)
        ? resolvedDefaultValue
        : [resolvedDefaultValue];
    }
    return [];
  }, [type, resolvedDefaultValue]);

  // useControllableState 훅을 사용하여 controlled / uncontrolled 상태 지원
  const [openValues, setOpenValues] = useControllableState<T[]>({
    // controlled 상태: valueProp를 배열로 변환 (단일 모드면 [value])
    prop:
      valueProp !== undefined
        ? Array.isArray(valueProp)
          ? valueProp
          : [valueProp]
        : undefined,
    defaultProp: initialOpenValues,
    onChange: (vals) => {
      if (onValueChange) {
        if (type === 'single') {
          // 단일 모드에서는 onValueChange의 타입을 (value: T | undefined) => void로 캐스팅
          (onValueChange as (value: T | undefined) => void)(
            vals.length > 0 ? vals[0] : undefined
          );
        } else {
          // 다중 모드에서는 onValueChange의 타입을 (value: T[]) => void로 캐스팅
          (onValueChange as (value: T[]) => void)(vals);
        }
      }
    },
  });

  // 단일 모드: 열려 있는 값은 하나만 유지
  const normalizedOpenValues = useMemo(() => {
    const current = openValues ?? [];
    if (type === 'single' && current.length > 1) {
      return current.slice(0, 1);
    }
    return current;
  }, [openValues, type]);

  const toggleValue = useCallback(
    (value: string) => {
      setOpenValues((prev = []) => {
        if (type === 'single') {
          return prev.includes(value as T) ? [] : [value as T];
        } else {
          return prev.includes(value as T)
            ? prev.filter((v) => v !== value)
            : [...prev, value as T];
        }
      });
    },
    [setOpenValues, type]
  );

  const isValueOpen = useCallback(
    (itemValue: string) =>
      (normalizedOpenValues ?? []).includes(itemValue as T),
    [normalizedOpenValues]
  );

  const contextValue = useMemo(
    () => ({
      type,
      openValues: normalizedOpenValues ?? [],
      toggleValue,
      isValueOpen,
    }),
    [type, normalizedOpenValues, toggleValue, isValueOpen]
  );

  return (
    <AccordionContext.Provider value={contextValue}>
      <div ref={ref} className={`${accordionRoot} ${className}`} {...props}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// any 캐스트
export const AccordionRoot = forwardRef(AccordionRootInner) as <
  T extends string = string,
>(
  props: AccordionProps<T> & { ref?: React.Ref<HTMLDivElement> }
) => JSX.Element;

(AccordionRoot as any).displayName = 'AccordionRoot';
