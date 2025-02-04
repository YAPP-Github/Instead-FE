'use client';

import { useState, useEffect, useRef, RefObject } from 'react';

type UseScrollOptions = {
  threshold?: number;
};

export function useScroll<T extends HTMLElement>({
  threshold = 100,
}: UseScrollOptions = {}): [RefObject<T>, boolean] {
  const [isScrolled, setIsScrolled] = useState(false);
  const elementRef = useRef<T>(null);

  useEffect(() => {
    const targetElement: HTMLElement | Window = elementRef.current ?? window;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollTop =
          targetElement instanceof HTMLElement
            ? targetElement.scrollTop
            : window.scrollY || document.documentElement.scrollTop;
        const scrolled = scrollTop > threshold;
        setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
      });
    };

    targetElement.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      targetElement.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return [elementRef, isScrolled];
}
