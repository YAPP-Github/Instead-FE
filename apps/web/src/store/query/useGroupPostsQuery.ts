import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { GET } from '@web/shared/server';
import { Tokens } from '@web/shared/server/types';
import { Post } from '@web/types';
import { PostGroup } from '@web/types/post';

type GroupPostsQuery = {
  postGroup: PostGroup;
  posts: Post[];
};

export function groupPostsQueryQueryOptions(
  agentId: number,
  postGroupId: number,
  tokens?: Tokens
) {
  return queryOptions({
    queryKey: ['postGroup', 'Agents'],
    queryFn: () =>
      GET<GroupPostsQuery>(
        `agents/${agentId}/post-groups/${postGroupId}/posts`,
        undefined,
        tokens
      ),

    staleTime: Infinity,
    gcTime: Infinity,
  });
}

export function useGroupPostsQuery(agentId: number, postGroupId: number) {
  return useSuspenseQuery(groupPostsQueryQueryOptions(agentId, postGroupId));
}
