import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/shared/server/fetch';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { IdParams, Post } from '@web/types';

export type GetAgentUploadReservedParams = {
  agentId: IdParams['agentId'];
  tokens?: Tokens;
};

export interface GetAgentUploadReservedResponse {
  posts: Post[];
}

export function getAgentUploadReservedQueryOptions({
  agentId,
  tokens,
}: GetAgentUploadReservedParams): UseSuspenseQueryOptions<GetAgentUploadReservedResponse> {
  return {
    queryKey: queryKeys.agents.reserved(agentId),
    queryFn: async () => {
      const response = await GET<GetAgentUploadReservedResponse>(
        `agents/${agentId}/post-groups/posts/upload-reserved`,
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

export function useGetAgentUploadReservedQuery(
  params: GetAgentUploadReservedParams
) {
  return useSuspenseQuery(getAgentUploadReservedQueryOptions(params));
}
