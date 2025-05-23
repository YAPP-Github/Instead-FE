import { PATCH } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { getAllPostsQueryOptions } from '../query/useGetAllPostsQuery';
import { IdParams } from '@web/types';

export interface UpdateSinglePromptRequest {
  prompt: string;
}

export type MutationUpdateSinglePrompt = IdParams;

/**
 * 게시물 프롬프트 기반 개별 수정 API
 *
 * 개별 게시물에 대해 입력된 프롬프트를 바탕으로 수정합니다.
 */
export function useUpdateSinglePostPromptMutation({
  agentId,
  postGroupId,
  postId,
}: Required<MutationUpdateSinglePrompt>) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: UpdateSinglePromptRequest) => {
      return PATCH(
        `agents/${agentId}/post-groups/${postGroupId}/posts/${postId}/prompt`,
        data
      );
    },
    onSuccess: () => {
      toast.success('프롬프트가 적용되었어요!');
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
