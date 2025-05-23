import { POST } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { CreatedPost } from '@web/types/post';
import { getAllPostsQueryOptions } from '../query/useGetAllPostsQuery';
import { useGetAllPostsQuery } from '../query/useGetAllPostsQuery';
import { IdParams } from '@web/types';

export type MutationCreateMorePostsResponse = CreatedPost;

type MutationCreateMorePosts = Omit<IdParams, 'postId'>;

/**
 * 게시물 추가 생성 API
 */
export function useCreateMorePostsMutation({
  agentId,
  postGroupId,
}: MutationCreateMorePosts) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: posts } = useGetAllPostsQuery({ agentId, postGroupId });

  return useMutation({
    mutationFn: () => {
      // eof가 true이면 더 이상 생성할 수 없음
      if (posts.data.postGroup.eof) {
        toast.error('게시글은 25개까지만 생성할 수 있어요.');
        throw new Error('게시글은 25개까지만 생성할 수 있어요.');
      }

      return POST<MutationCreateMorePostsResponse>(
        `agents/${agentId}/post-groups/${postGroupId}/posts`
      );
    },
    onSuccess: () => {
      toast.success('게시글이 5개 추가됐어요!');

      queryClient.invalidateQueries(
        getAllPostsQueryOptions({
          agentId: Number(agentId),
          postGroupId: Number(postGroupId),
        })
      );
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
