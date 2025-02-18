import { GET } from '@web/shared/server';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { IdParams, Post } from '@web/types';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';

const STALE_TIME = 1000 * 60 * 2;
const GC_TIME = 1000 * 60 * 3;

export type GetPostParams = IdParams &
  Pick<Required<IdParams>, 'postId'> & {
    tokens?: Tokens;
  };

export type GetPostResponse = Post;

/**
 * 개별 게시물 상세 조회 API
 *
 * 게시물 클릭 시 단건 게시물에 대한 상세정보를 조회합니다.
 */
export function getPostQueryOptions({
  agentId,
  postGroupId,
  postId,
  tokens,
}: GetPostParams) {
  return queryOptions({
    queryKey: queryKeys.posts.detail(agentId, postGroupId, postId),
    queryFn: () =>
      GET<GetPostResponse>(
        `agents/${agentId}/post-groups/${postGroupId}/posts/${postId}`,
        undefined,
        tokens
      ),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetPostQuery(params: GetPostParams) {
  return useSuspenseQuery(getPostQueryOptions(params));
}
