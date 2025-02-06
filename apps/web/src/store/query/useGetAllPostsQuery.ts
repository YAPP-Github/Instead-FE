import { GET } from '@web/shared/server';
import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Post } from '@web/types';
import { EditPageParams } from '@web/app/(prompt)/edit/[agentId]/[postGroupId]/types';
import { PostGroup } from '@web/types/post';
import { Tokens } from '@web/shared/server/types';

const STALE_TIME = 1000 * 60 * 1;
const GC_TIME = 1000 * 60 * 1;

export type GetAllPostsParams = EditPageParams & {
  tokens?: Tokens;
};

export interface GetAllPostsResponse {
  postGroup: PostGroup;
  posts: Post[];
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
    queryKey: ['posts', agentId, postGroupId],
    queryFn: () =>
      GET<GetAllPostsResponse>(
        `agents/${agentId}/post-groups/${postGroupId}/posts`,
        undefined,
        tokens
      ),
    // NOTE: 항상 fresh 상태로 유지
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetAllPostsQuery(params: GetAllPostsParams) {
  return useSuspenseQuery(getAllPostsQueryOptions(params));
}
