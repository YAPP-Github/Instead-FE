'use client';

import { ThemeProvider } from '@repo/ui/provider';
import { QueryClientProvider } from '@web/store/query/QueryClientProvider';
import { OverlayProvider } from 'overlay-kit';
import { ReactNode } from 'react';

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider>
      <ThemeProvider theme="light">
        <OverlayProvider>{children}</OverlayProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
