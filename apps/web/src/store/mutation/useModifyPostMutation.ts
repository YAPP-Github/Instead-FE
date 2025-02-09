import { useToast } from '@repo/ui/hooks';
import { useMutation } from '@tanstack/react-query';
import { PUT } from '@web/shared/server';
import { Post } from '@web/types';

export interface MutationModifyPost {
  agentId: number;
  postGroupId: number;
  postId: number;
}

export interface MutationModifyPostRequest {
  updateType: 'STATUS' | 'UPLOAD_TIME' | 'CONTENT' | 'CONTENT_IMAGE';
  imageUrls?: string[];
  content?: Post['content'];
  status?: Post['status'];
  uploadTime?: Date;
}

export function useModifyPostMutation({
  agentId,
  postGroupId,
  postId,
}: MutationModifyPost) {
  const toast = useToast();

  return useMutation({
    mutationFn: (values: MutationModifyPostRequest) =>
      PUT(
        `agents/${agentId}/post-groups/${postGroupId}/posts/${postId}`,
        values
      ),
    onSuccess: () => {
      toast.success('저장되었습니다.');
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
