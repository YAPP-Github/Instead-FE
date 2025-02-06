import { POST } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { EditPageParams } from '@web/app/(prompt)/edit/[agentId]/[postGroupId]/types';
import { Post } from '@web/types';
import { PostGroup } from '@web/types/post';
import { getAllPostsQueryOptions } from '../query/useGetAllPostsQuery';

export interface CreateMorePostsResponse {
  postGroup: PostGroup;
  posts: Post[];
}

/**
 * 게시물 추가 생성 API
 */
export function useCreateMorePostsMutation({
  agentId,
  postGroupId,
}: EditPageParams) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: () =>
      POST<CreateMorePostsResponse>(
        `agents/${agentId}/post-groups/${postGroupId}/posts`
      ),
    onSuccess: () => {
      toast.success('게시글이 5개 추가됐어요!');
      queryClient.invalidateQueries(
        getAllPostsQueryOptions({ agentId, postGroupId })
      );
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
