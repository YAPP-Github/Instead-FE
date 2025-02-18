import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { FetchQueryOptions } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { getQueryClient } from './getQueryClient';

export type FetchOptions = Pick<
  FetchQueryOptions,
  'queryKey' | 'queryFn' | 'staleTime' | 'gcTime'
>;

type Props = {
  fetchOptions: FetchOptions | FetchOptions[];
  children: ReactNode;
};

export async function ServerFetchBoundary({ fetchOptions, children }: Props) {
  const queryClient = getQueryClient();

  const options = Array.isArray(fetchOptions) ? fetchOptions : [fetchOptions];

  await Promise.all(options.map((option) => queryClient.fetchQuery(option)));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
