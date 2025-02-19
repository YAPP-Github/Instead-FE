import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/shared/server/fetch';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { Agent, AgentPersonalSetting, IdParams } from '@web/types';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

export type GetAgentDetailParams = {
  agentId: IdParams['agentId'];
  tokens?: Tokens;
};

export interface GetAgentDetailResponse {
  agent: Agent;
  agentPersonalSetting: AgentPersonalSetting;
  timestamp: string;
}

export function getAgentDetailQueryOptions({
  agentId,
  tokens,
}: GetAgentDetailParams) {
  return queryOptions({
    queryKey: queryKeys.agents.detail(agentId),
    queryFn: async () => {
      const response = await GET<GetAgentDetailResponse>(
        `agents/${agentId}`,
        undefined,
        tokens
      );
      return response.data;
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetAgentDetailQuery(params: GetAgentDetailParams) {
  return useSuspenseQuery(getAgentDetailQueryOptions(params));
}
