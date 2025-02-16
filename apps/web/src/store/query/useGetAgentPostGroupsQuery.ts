import {
  queryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/shared/server/fetch';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { IdParams, PostGroup } from '@web/types';

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
}: GetAgentPostGroupsParams): UseSuspenseQueryOptions<GetAgentPostGroupsResponse> {
  return {
    queryKey: queryKeys.posts.postGroups(agentId),
    queryFn: async () => {
      const response = await GET<GetAgentPostGroupsResponse>(
        `agents/${agentId}/post-groups`,
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

export function useGetAgentPostGroupsQuery(params: GetAgentPostGroupsParams) {
  return useSuspenseQuery(getAgentPostGroupsQueryOptions(params));
}
