'use client';

import { QueryClientProvider as _QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { getQueryClient } from './getQueryClient';

export const queryClient = getQueryClient();

export function QueryClientProvider({ children }: { children: ReactNode }) {
  return (
    <_QueryClientProvider client={queryClient}>{children}</_QueryClientProvider>
  );
}
