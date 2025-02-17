import { GET } from '@web/shared/server';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { IdParams, Post, PostGroup } from '@web/types';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';

const STALE_TIME = 1000 * 60 * 2;
const GC_TIME = 1000 * 60 * 3;

export type GetPostParams = IdParams &
  Pick<Required<IdParams>, 'postId'> & {
    tokens?: Tokens;
  };

export type GetPostResponse = {
  postGroup: PostGroup;
  post: Post;
};

/**
 * 개별 게시물 상세 조회 API
 *
 * 특정 게시물의 상세 정보를 조회합니다.
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
