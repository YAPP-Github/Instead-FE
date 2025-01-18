'use client';

import { ThemeProvider } from '@repo/theme/provider';
import { OverlayProvider } from 'overlay-kit';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme="light">
      <OverlayProvider>{children}</OverlayProvider>
    </ThemeProvider>
  );
}
