import { useToast } from '@repo/ui/hooks';
import { useMutation } from '@tanstack/react-query';
import { PUT } from '@web/shared/server';
import { Post } from '@web/types';

export interface MutationUpdatePost {
  agentId: number;
  postGroupId: number;
  postId: number;
}

export interface MutationUpdatePostRequest {
  updateType: 'STATUS' | 'UPLOAD_TIME' | 'CONTENT' | 'CONTENT_IMAGE';
  imageUrls?: string[];
  content?: Post['content'];
  status?: Post['status'];
  uploadTime?: Date;
}

export function useUpdatePostMutation({
  agentId,
  postGroupId,
  postId,
}: MutationUpdatePost) {
  const toast = useToast();

  return useMutation({
    mutationFn: (values: MutationUpdatePostRequest) =>
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
