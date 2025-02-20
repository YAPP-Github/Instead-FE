import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/shared/server/fetch';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { AgentId, Post } from '@web/types';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

export type GetAgentUploadReservedParams = {
  agentId: AgentId;
  tokens?: Tokens;
};

export interface GetAgentUploadReservedResponse {
  posts: Post[];
}

export function getAgentUploadReservedQueryOptions({
  agentId,
  tokens,
}: GetAgentUploadReservedParams) {
  return queryOptions({
    queryKey: queryKeys.agents.reserved(agentId),
    queryFn: async () => {
      const response = await GET<GetAgentUploadReservedResponse>(
        `agents/${agentId}/post-groups/posts/upload-reserved`,
        undefined,
        tokens
      );
      return response.data;
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetAgentUploadReservedQuery(
  params: GetAgentUploadReservedParams
) {
  return useSuspenseQuery(getAgentUploadReservedQueryOptions(params));
}
