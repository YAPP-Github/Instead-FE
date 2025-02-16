import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/shared/server/fetch';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { Agent } from '@web/types';

export function getAgentQueryOptions(
  tokens: Tokens
): UseSuspenseQueryOptions<Agent> {
  return {
    queryKey: queryKeys.agents.agents,
    queryFn: async () => {
      const response = await GET<Agent>(`agents`, undefined, tokens);
      return response.data;
    },
    // NOTE: 항상 fresh 상태로 유지
    staleTime: Infinity,
    gcTime: Infinity,
  };
}

export function useGetAgentQuery(tokens: Tokens) {
  return useSuspenseQuery(getAgentQueryOptions(tokens));
}
