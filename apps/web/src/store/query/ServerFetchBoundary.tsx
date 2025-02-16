import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import type { FetchQueryOptions } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import { getQueryClient } from './getQueryClient';

export type FetchOptions = Pick<FetchQueryOptions, 'queryKey' | 'queryFn'>;

type Props = {
  fetchOptions: FetchOptions[] | FetchOptions;
  children: ReactNode | ReactNode[];
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

// export type FetchOptions<
//   TQueryFnData = unknown,
//   TError = Error,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey,
// > = Pick<
//   FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
//   'queryKey' | 'queryFn'
// >;

// type Props<
//   TQueryFnData = unknown,
//   TError = Error,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey,
// > = {
//   fetchOptions:
//     | FetchOptions<TQueryFnData, TError, TData, TQueryKey>[]
//     | FetchOptions<TQueryFnData, TError, TData, TQueryKey>;
//   children: ReactNode | ReactNode[];
// };

// export async function ServerFetchBoundary<
//   TQueryFnData = unknown,
//   TError = Error,
//   TData = TQueryFnData,
//   TQueryKey extends QueryKey = QueryKey,
// >({ fetchOptions, children }: Props<TQueryFnData, TError, TData, TQueryKey>) {
//   const queryClient = getQueryClient();

//   const options = Array.isArray(fetchOptions) ? fetchOptions : [fetchOptions];

//   await Promise.all(options.map((option) => queryClient.fetchQuery(option)));

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       {children}
//     </HydrationBoundary>
//   );
// }
