import { DELETE } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { IdParams, Post } from '@web/types';
import { queryKeys } from '../constants';

export type MutationDeletePost = Pick<IdParams, 'agentId'>;

/**
 * 게시물 그룹 삭제 API
 *
 * 업로드가 확정되지 않은 단건의 게시물 그룹을 삭제합니다.
 *
 * 업로드가 확정된 상태의 게시물 그룹은 삭제할 수 없습니다.
 */
export function useDeletePostGroupMutation({ agentId }: MutationDeletePost) {
  const queryClient = useQueryClient();

  const toast = useToast();

  return useMutation({
    mutationFn: (postGroupId: Post['postGroupId']) =>
      DELETE(`agents/${agentId}/post-groups/${postGroupId}`),
    onSuccess: () => {
      toast.success('주제가 삭제되었어요.');
      queryClient.invalidateQueries({
        queryKey: queryKeys.posts.postGroups(agentId),
      });
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
