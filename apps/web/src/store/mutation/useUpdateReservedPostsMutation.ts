import { PUT } from '@web/shared/server';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { AgentId, PostGroupId, PostId } from '@web/types';

interface UpdateReservedPostPayload {
  postId?: PostId;
  postGroupId?: PostGroupId;
  uploadTime?: string;
}

interface UpdateReservedPostsRequest {
  posts: UpdateReservedPostPayload[];
}

/**
 *
 * 계정별 예약 게시물 예약일시 수정 API
 *
 * 주제에 관계 없이 계정별 예약 게시물의 예약 시간을 수정합니다.
 */
export function useUpdateReservedPostsMutation(agentId: AgentId) {
  const toast = useToast();

  return useMutation({
    mutationFn: (data: UpdateReservedPostsRequest) =>
      PUT(`agents/${agentId}/posts/upload-reserved`, data),
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
