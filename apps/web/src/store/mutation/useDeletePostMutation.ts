import { DELETE } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { EditPageParams } from '@web/app/(prompt)/edit/[agentId]/[postGroupId]/types';
import { getAllPostsQueryOptions } from '../query/useGetAllPostsQuery';
import { Post } from '@web/types';

/**
 * 게시물 개별 삭제 API
 *
 * 업로드가 확정되지 않은 단건의 게시물을 개별 삭제합니다. (생성됨, 수정 중, 수정 완료)
 *
 * 업로드가 확정된 상태의 게시물은 삭제할 수 없습니다. (예약 완료, 업로드 완료, 업로드 실패)
 */
export function useDeletePostMutation({
  agentId,
  postGroupId,
}: EditPageParams) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (postId: Post['id']) =>
      DELETE(`agents/${agentId}/post-groups/${postGroupId}/posts/${postId}`),
    onSuccess: () => {
      toast.success('게시글이 삭제되었어요.');
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
