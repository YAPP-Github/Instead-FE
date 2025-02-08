import { useToast } from '@repo/ui/hooks';
import { useMutation } from '@tanstack/react-query';
import { PUT } from '@web/shared/server';
import { Post } from '@web/types';

export interface MutationModifyPosts {
  agentId: number;
  postGroupId: number;
}

type NullablePostFields = {
  [K in Exclude<keyof Post, 'id'>]?: Post[K];
};

export interface MutationModifyPostsRequest extends NullablePostFields {
  postId: Post['id'];
}

export function useModifyPostsMutation({
  agentId,
  postGroupId,
}: MutationModifyPosts) {
  const toast = useToast();

  return useMutation({
    mutationFn: (values: MutationModifyPostsRequest[]) =>
      PUT(`agents/${agentId}/post-groups/${postGroupId}/posts`, {
        posts: values,
      }),
    onSuccess: () => {
      // TODO 토스트 안 보여 줘도 될지?..
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
