import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/shared/server';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';
import { Post } from '@web/types';
import { PostGroup } from '@web/types/post';

export interface PostHistoryQuery {
  id: number;
  createdAt: Date | string;
  prompt: string;
  response: string;
  type: 'EACH' | 'ALL';
}

export function PostHistoryQueryQueryOptions(
  agentId: number,
  postGroupId: number,
  postId: number,
  tokens?: Tokens
) {
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

export function useGroupPostsQuery(
  agentId: number,
  postGroupId: number,
  postId: number
) {
  return useSuspenseQuery(
    PostHistoryQueryQueryOptions(agentId, postGroupId, postId)
  );
}
