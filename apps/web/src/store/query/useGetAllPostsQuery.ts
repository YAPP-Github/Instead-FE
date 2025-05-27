import { GET } from '@web/shared/server';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { IdParams, PostGroup, PostsByStatus } from '@web/types';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 2;

export type GetAllPostsParams = Omit<IdParams, 'postId'> & {
  tokens?: Tokens;
};

export interface GetAllPostsResponse {
  postGroup: PostGroup;
  posts: PostsByStatus;
}

/**
 * 게시물 그룹별 게시물 목록 조회 API
 *
 * 게시물 그룹에 해당되는 모든 게시물 목록을 조회합니다.
 */
export function getAllPostsQueryOptions({
  agentId,
  postGroupId,
  tokens,
}: GetAllPostsParams) {
  return queryOptions({
    queryKey: queryKeys.posts.all(Number(agentId), Number(postGroupId)),
    queryFn: () =>
      GET<GetAllPostsResponse>(
        `v1/agents/${agentId}/post-groups/${postGroupId}/posts`,
        undefined,
        tokens
      ),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetAllPostsQuery(params: GetAllPostsParams) {
  return useSuspenseQuery(getAllPostsQueryOptions(params));
}
