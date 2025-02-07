import { POST } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { EditPageParams } from '@web/app/(prompt)/edit/[agentId]/[postGroupId]/types';
import { Post } from '@web/types';
import { PostGroup, SKELETON_STATUS } from '@web/types/post';
import {
  getAllPostsQueryOptions,
  GetAllPostsResponse,
} from '../query/useGetAllPostsQuery';
import { ApiResponse } from '@web/shared/server/types';
import { createItemsByStatus } from '@web/components/common/DNDController';
import { useGetAllPostsQuery } from '../query/useGetAllPostsQuery';

export interface CreateMorePostsResponse {
  postGroup: PostGroup;
  posts: Post[];
}

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

      return POST<CreateMorePostsResponse>(
        `agents/${agentId}/post-groups/${postGroupId}/posts`
      );
    },
    onMutate: async () => {
      // 진행 중인 posts 쿼리 취소
      await queryClient.cancelQueries(
        getAllPostsQueryOptions({ agentId, postGroupId })
      );

      // 이전 데이터 백업
      const previousData = queryClient.getQueryData<
        ApiResponse<GetAllPostsResponse>
      >(getAllPostsQueryOptions({ agentId, postGroupId }).queryKey);

      // 낙관적 업데이트: 기존 데이터 앞에 5개의 스켈레톤 추가
      queryClient.setQueryData<ApiResponse<GetAllPostsResponse>>(
        getAllPostsQueryOptions({ agentId, postGroupId }).queryKey,
        (old) => {
          if (!old) return old;

          const itemsByStatus = createItemsByStatus(old.data.posts);
          const currentStatusLength = itemsByStatus['GENERATED']?.length || 0;

          const skeletonPosts: Post[] = Array.from({ length: 5 }).map(
            (_, index) => ({
              id: index,
              createdAt: '',
              updatedAt: '',
              summary: '',
              content: '',
              postImages: [],
              status: 'GENERATED',
              uploadTime: SKELETON_STATUS,
              displayOrder: currentStatusLength + index + 1,
            })
          );

          return {
            ...old,
            data: {
              ...old.data,
              posts: [...old.data.posts, ...skeletonPosts],
            },
          };
        }
      );

      return { previousData };
    },
    onError: (error, _, context) => {
      // 에러 발생 시 이전 상태로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(
          getAllPostsQueryOptions({ agentId, postGroupId }).queryKey,
          context.previousData
        );
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success('게시글이 5개 추가됐어요!');
      // 실제 서버 데이터로 동기화
      queryClient.invalidateQueries(
        getAllPostsQueryOptions({ agentId, postGroupId })
      );
    },
  });
}
