import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/shared/server/fetch';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { IdParams, PostGroup } from '@web/types';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

export type GetAgentPostGroupsParams = {
  agentId: IdParams['agentId'];
  tokens?: Tokens;
};

export interface GetAgentPostGroupsResponse {
  postGroups: PostGroup[];
}

export function getAgentPostGroupsQueryOptions({
  agentId,
  tokens,
}: GetAgentPostGroupsParams) {
  return queryOptions({
    queryKey: queryKeys.posts.postGroups(agentId),
    queryFn: async () => {
      const response = await GET<GetAgentPostGroupsResponse>(
        `v1/agents/${agentId}/post-groups`,
        undefined,
        tokens
      );
      return response.data;
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetAgentPostGroupsQuery(params: GetAgentPostGroupsParams) {
  return useSuspenseQuery(getAgentPostGroupsQueryOptions(params));
}
