import {
  queryOptions,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';
import { GET } from '@web/shared/server';
import { ApiResponse, Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { IdParams } from '@web/types';

export interface PostHistoryQuery {
  id: number;
  createdAt: Date | string;
  prompt: string;
  response: string;
  type: 'EACH' | 'ALL';
}

type PostHistoryQueryParams = Omit<IdParams, 'postId'> &
  Pick<Required<IdParams>, 'postId'> & {
    tokens?: Tokens;
  };

export function PostHistoryQueryQueryOptions({
  agentId,
  postGroupId,
  postId,
  tokens,
}: PostHistoryQueryParams): UseSuspenseQueryOptions<
  ApiResponse<PostHistoryQuery>
> {
  return {
    queryKey: queryKeys.postHistory.detail(postId),
    queryFn: () =>
      GET<PostHistoryQuery>(
        `agents/${agentId}/post-groups/${postGroupId}/posts/${postId}/prompt-histories`,
        undefined,
        tokens
      ),

    staleTime: Infinity,
    gcTime: Infinity,
  };
}

export function usePostHistoryQuery(params: PostHistoryQueryParams) {
  return useSuspenseQuery(PostHistoryQueryQueryOptions(params));
}
