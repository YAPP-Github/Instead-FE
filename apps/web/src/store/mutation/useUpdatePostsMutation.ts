import { PUT } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { EditPageParams } from '@web/app/(prompt)/edit/[agentId]/[postGroupId]/types';
import { PostStatus } from '@web/types/post';
import { getAllPostsQueryOptions } from '../query/useGetAllPostsQuery';

interface UpdatePostPayload {
  postId?: number;
  status?: PostStatus;
  uploadTime?: string;
  displayOrder?: number;
}

interface UpdatePostsRequest {
  posts: UpdatePostPayload[];
}

/**
 *
 * 게시물 기타 정보 수정 API
 *
 * 기존 여러 게시물들의 상태 / 업로드 예약 일시 / 순서를 수정합니다.
 */
export function useUpdatePostsMutation({
  agentId,
  postGroupId,
}: EditPageParams) {
  const queryClient = useQueryClient();
  const toast = useToast();

  return useMutation({
    mutationFn: (data: UpdatePostsRequest) =>
      PUT(`agents/${agentId}/post-groups/${postGroupId}/posts`, data),
    onSuccess: () => {
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
