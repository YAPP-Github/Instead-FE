import { PATCH } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { EditPageParams } from '@web/app/(prompt)/edit/[agentId]/[postGroupId]/types';
import { getAllPostsQueryOptions } from '../query/useGetAllPostsQuery';
import { Post } from '@web/types';

export interface UpdatePromptRequest {
  prompt: string;
  postsId: Post['id'][];
}

/**
 * 게시물 프롬프트 기반 일괄 수정
 *
 * 일괄 게시물에 대해 입력된 프롬프트를 바탕으로 수정합니다.
 */
export function useUpdatePromptMutation({
  agentId,
  postGroupId,
}: EditPageParams) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: UpdatePromptRequest) =>
      PATCH(`agents/${agentId}/post-groups/${postGroupId}/posts/prompt`, data),
    onSuccess: () => {
      toast.success('프롬프트가 적용되었어요!');
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
