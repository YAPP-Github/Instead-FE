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
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrolled = scrollTop > threshold;
        setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return [elementRef, isScrolled];
}
