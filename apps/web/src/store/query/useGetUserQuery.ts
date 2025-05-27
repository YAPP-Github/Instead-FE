import { GET } from '@web/shared/server';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { queryKeys } from '../constants';
import { User } from '@web/types/user';
import { Tokens } from '@web/shared/server/types';

const STALE_TIME = 1000 * 60 * 2;
const GC_TIME = 1000 * 60 * 3;

export type GetUserParams = {
  tokens?: Tokens;
};

/**
 * 유저 정보 조회 API
 *
 * 유저 정보를 조회하는 API입니다.
 */
export function getUserQueryOptions(tokens?: Tokens) {
  return queryOptions({
    queryKey: queryKeys.user,
    queryFn: () => GET<User>(`v1/users`, undefined, tokens),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetUserQuery(tokens?: Tokens) {
  return useSuspenseQuery(getUserQueryOptions(tokens));
}
