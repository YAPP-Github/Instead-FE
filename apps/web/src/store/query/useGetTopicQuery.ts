import { GET } from '@web/shared/server';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import type { IdParams } from '@web/types';
import { Tokens } from '@web/shared/server/types';
import { queryKeys } from '../constants';

const STALE_TIME = 1000 * 60 * 2;
const GC_TIME = 1000 * 60 * 3;

export type GetTopicParams = Pick<IdParams, 'agentId' | 'postGroupId'> & {
  tokens?: Tokens;
};

export type GetTopicResponse = {
  topic: string;
};

/**
 * 게시물 그룹 주제 조회 API
 *
 * 화면 헤더 Breadcrumb에 표시할 게시물 그룹 주제를 조회합니다.
 */
export function getTopicQueryOptions({
  agentId,
  postGroupId,
  tokens,
}: GetTopicParams) {
  return queryOptions({
    queryKey: queryKeys.topics.detail(agentId, postGroupId),
    queryFn: () =>
      GET<GetTopicResponse>(
        `agents/${agentId}/post-groups/${postGroupId}/topic`,
        undefined,
        tokens
      ),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });
}

export function useGetTopicQuery(params: GetTopicParams) {
  return useSuspenseQuery(getTopicQueryOptions(params));
}
