import { POST } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { EditPageParams } from '@web/app/(prompt)/edit/[agentId]/[postGroupId]/types';
import { CreatedPost } from '@web/types/post';
import {
  getAllPostsQueryOptions,
  GetAllPostsResponse,
} from '../query/useGetAllPostsQuery';
import { ApiResponse } from '@web/shared/server/types';
import { useGetAllPostsQuery } from '../query/useGetAllPostsQuery';

export type MutationCreateMorePostsResponse = CreatedPost;

/**
 * 게시물 추가 생성 API
 */
export function useCreateMorePostsMutation({
  agentId,
  postGroupId,
}: EditPageParams) {
  const queryClient = useQueryClient();
  const toast = useToast();
  const { data: posts } = useGetAllPostsQuery({ agentId, postGroupId });

  return useMutation({
    mutationFn: () => {
      // eof가 true이면 더 이상 생성할 수 없음
      if (posts.data.postGroup.eof) {
        toast.error('게시글은 25개까지만 생성할 수 있어요.');
        throw new Error('게시글은 25개까지만 생성할 수 있어요.');
      }

      return POST<MutationCreateMorePostsResponse>(
        `agents/${agentId}/post-groups/${postGroupId}/posts`
      );
    },
    onSuccess: (response) => {
      toast.success('게시글이 5개 추가됐어요!');

      // 현재 캐시된 데이터 가져오기
      const currentData = queryClient.getQueryData<
        ApiResponse<GetAllPostsResponse>
      >(getAllPostsQueryOptions({ agentId, postGroupId }).queryKey);

      if (currentData) {
        // 기존 데이터와 새로운 데이터 합치기
        queryClient.setQueryData(
          getAllPostsQueryOptions({ agentId, postGroupId }).queryKey,
          {
            ...currentData,
            data: {
              ...currentData.data,
              posts: [...currentData.data.posts, ...response.data.posts],
            },
          }
        );
      }
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
