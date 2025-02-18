import { PATCH } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { getAllPostsQueryOptions } from '../query/useGetAllPostsQuery';
import { IdParams, Post } from '@web/types';

export interface UpdatePromptRequest {
  isEntire?: boolean;
  prompt: string;
  postsId?: Post['id'][];
}

export type MutationUpdatePrompt = {
  agentId: IdParams['agentId'];
  postGroupId: IdParams['postGroupId'];
  postId?: IdParams['postId'];
};

/**
 * 게시물 프롬프트 기반 일괄 수정
 *
 * 일괄 게시물에 대해 입력된 프롬프트를 바탕으로 수정합니다.
 */
export function useUpdatePromptMutation({
  agentId,
  postGroupId,
  postId,
}: MutationUpdatePrompt) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: ({ isEntire = true, prompt, postsId }: UpdatePromptRequest) => {
      const endpoint = isEntire
        ? `agents/${agentId}/post-groups/${postGroupId}/posts/prompt`
        : `agents/${agentId}/post-groups/${postGroupId}/posts/${postId}/prompt`;

      const body = isEntire ? { prompt, postsId } : { prompt };

      return PATCH(endpoint, body);
    },
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
