import {
  queryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/shared/server/fetch';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { Agent, AgentPersonalSetting, IdParams } from '@web/types';

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
}: GetAgentDetailParams): UseSuspenseQueryOptions<GetAgentDetailResponse> {
  return {
    queryKey: queryKeys.agents.detail(agentId),
    queryFn: async () => {
      const response = await GET<GetAgentDetailResponse>(
        `agents/${agentId}`,
        undefined,
        tokens
      );
      return response.data;
    },
    // NOTE: 항상 fresh 상태로 유지
    staleTime: Infinity,
    gcTime: Infinity,
  };
}

export function useGetAgentDetailQuery(params: GetAgentDetailParams) {
  return useSuspenseQuery(getAgentDetailQueryOptions(params));
}
