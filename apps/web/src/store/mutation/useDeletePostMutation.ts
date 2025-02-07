import { useToast } from '@repo/ui/hooks';
import { useMutation } from '@tanstack/react-query';
import { DELETE } from '@web/shared/server';
import { Post } from '@web/types';

export interface MutationDeletePost {
  agentId: number;
  postGroupId: number;
}

export function useDeletePostMutation({
  agentId,
  postGroupId,
}: MutationDeletePost) {
  const toast = useToast();

  return useMutation({
    mutationFn: (postId: Post['id']) =>
      DELETE(`agents/${agentId}/post-groups/${postGroupId}/posts/${postId}`),
    onSuccess: () => {
      // TODO
      toast.success('게시글이 삭제되었어요!');
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
