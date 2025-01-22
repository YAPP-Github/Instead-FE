'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ThemeProvider } from '../ThemeProvider/ThemeProvider';

type PortalConsumerProps = {
  children: ReactNode;
};

export function PortalConsumer({ children }: PortalConsumerProps) {
  const [mounted, setMounted] = useState(false);
  const portalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
    portalRef.current = document.createElement('div');
    document.body.appendChild(portalRef.current);

    return () => {
      if (portalRef.current) {
        document.body.removeChild(portalRef.current);
      }
    };
  }, []);

  if (!mounted || !portalRef.current) return null;

  return createPortal(
    <ThemeProvider>{children}</ThemeProvider>,
    portalRef.current
  );
}
