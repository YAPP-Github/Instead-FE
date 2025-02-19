import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/shared/server/fetch';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { Agent } from '@web/types';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

export interface GetAgentResponse {
  agents: Agent[];
}

export function getAgentQueryOptions(tokens?: Tokens) {
  return queryOptions({
    queryKey: queryKeys.agents.agents,
    queryFn: async () => {
      const response = await GET<GetAgentResponse>(`agents`, undefined, tokens);
      return response.data;
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetAgentQuery(tokens?: Tokens) {
  return useSuspenseQuery(getAgentQueryOptions(tokens));
}
