import { useToast } from '@repo/ui/hooks';
import { useMutation } from '@tanstack/react-query';
import { PATCH } from '@web/shared/server';
import { useGroupPostsQuery } from '../query/useGroupPostsQuery';
import { queryClient } from '../query/QueryClientProvider';

export interface MutationPatchPrompt {
  agentId: number;
  postGroupId: number;
  postId: number;
}

export interface MutationPatchPromptRequest {
  isEntire: boolean;
  prompt: string;
}

export function usePatchPromptMutation({
  agentId,
  postGroupId,
  postId,
}: MutationPatchPrompt) {
  const toast = useToast();
  const { data } = useGroupPostsQuery(Number(agentId), Number(postGroupId));
  const postsId = data?.data.posts
    .filter((post) => post.status === 'EDITING')
    .map((post) => post.id);

  return useMutation({
    mutationFn: (values: MutationPatchPromptRequest) => {
      const endpoint = values.isEntire
        ? `agents/${agentId}/post-groups/${postGroupId}/posts/prompt`
        : `agents/${agentId}/post-groups/${postGroupId}/posts/${postId}/prompt`;

      const body = values.isEntire
        ? { prompt: values.prompt, postsId }
        : { prompt: values.prompt };

      return PATCH(endpoint, body);
    },
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ['postGroup', 'Agents'],
      });
      // TODO 정해 주시면 바꾸기
      toast.success('게시글이 수정되었어요!');
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
