import { POST } from '@web/shared/server';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CreateFormValues } from '@web/app/create/types';
import { useToast } from '@repo/ui/hooks';
import { CreatedPost } from '@web/types/post';

export type MutationCreatePostsType = {
  agentId: string;
};

export type MutationCreatePostsResponse = CreatedPost;

type MutationCreatePostsRequest = CreateFormValues;

export function useCreatePostsMutation({ agentId }: MutationCreatePostsType) {
  const router = useRouter();
  const toast = useToast();

  return useMutation({
    mutationFn: (values: MutationCreatePostsRequest) =>
      POST<MutationCreatePostsResponse>(
        `agents/${agentId}/post-groups/posts`,
        values
      ),
    onSuccess: (response) => {
      const postGroupId = response.data.postGroupId;
      router.push(`/edit/${agentId}/${postGroupId}`);
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
