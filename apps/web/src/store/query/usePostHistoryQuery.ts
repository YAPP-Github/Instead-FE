import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/shared/server';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { IdParams } from '@web/types';

export interface PostHistoryQuery {
  id: number;
  createdAt: Date | string;
  prompt: string;
  response: string;
  type: 'EACH' | 'ALL';
}

export type PostHistoryQueryParams = IdParams &
  Pick<Required<IdParams>, 'postId'> & {
    tokens?: Tokens;
  };

export function PostHistoryQueryQueryOptions({
  agentId,
  postGroupId,
  postId,
  tokens,
}: PostHistoryQueryParams) {
  return queryOptions({
    queryKey: queryKeys.postHistory.detail(postId),
    queryFn: () =>
      GET<PostHistoryQuery>(
        `agents/${agentId}/post-groups/${postGroupId}/posts/${postId}/prompt-histories`,
        undefined,
        tokens
      ),

    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function usePostHistoryQuery(params: PostHistoryQueryParams) {
  return useSuspenseQuery(PostHistoryQueryQueryOptions(params));
}
