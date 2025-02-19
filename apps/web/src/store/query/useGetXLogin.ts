import { GET } from '@web/shared/server';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { queryKeys } from '../constants';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

export interface GetXLoginResponse {
  redirectUrl: string;
}

/**
 * X 로그인 API
 */
export function getXLoginQueryOptions() {
  return queryOptions({
    queryKey: queryKeys.x,
    queryFn: () =>
      GET<GetXLoginResponse>(`twitter/login`, undefined, undefined),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
    enabled: false,
  });
}

export function useGetXLoginQuery() {
  return useQuery(getXLoginQueryOptions());
}
