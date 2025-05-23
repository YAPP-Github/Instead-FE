import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/shared/server';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { IdParams } from '@web/types';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

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
}: PostHistoryQueryParams) {
  return queryOptions({
    queryKey: queryKeys.postHistory.detail(postId),
    queryFn: () =>
      GET<PostHistoryQuery>(
        `v1/agents/${agentId}/post-groups/${postGroupId}/posts/${postId}/prompt-histories`,
        undefined,
        tokens
      ),

    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function usePostHistoryQuery(params: PostHistoryQueryParams) {
  return useSuspenseQuery(PostHistoryQueryQueryOptions(params));
}
