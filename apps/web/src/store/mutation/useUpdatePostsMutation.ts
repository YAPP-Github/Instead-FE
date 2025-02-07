import { PUT } from '@web/shared/server';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@repo/ui/hooks';
import { EditPageParams } from '@web/app/(prompt)/edit/[agentId]/[postGroupId]/types';
import { Post, PostStatus } from '@web/types/post';
import {
  getAllPostsQueryOptions,
  GetAllPostsResponse,
} from '../query/useGetAllPostsQuery';

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
 * 게시물 기타 정보 수정 API (Optimistic Update 적용 버전)
 *
 * 먼저 캐시에 저장된 데이터를 기반으로 미리 예상 결과를 업데이트하고,
 * 서버 호출 후 실패시 롤백하거나 최신 데이터를 재조회합니다.
 */
export function useUpdatePostsMutation({
  agentId,
  postGroupId,
}: EditPageParams) {
  const toast = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdatePostsRequest) =>
      PUT(`agents/${agentId}/post-groups/${postGroupId}/posts`, data),
    onMutate: async (updatePayload: UpdatePostsRequest) => {
      // 동일 키의 쿼리 취소
      await queryClient.cancelQueries(
        getAllPostsQueryOptions({
          agentId,
          postGroupId,
        })
      );
      // 현재 캐시 데이터를 임시 저장 (업데이트 실패 시 복구에 사용)
      const previousData = queryClient.getQueryData(
        getAllPostsQueryOptions({
          agentId,
          postGroupId,
        }).queryKey
      );

      // optimistic update: 기존 데이터를 기반으로 posts 배열 항목을 변경
      queryClient.setQueryData(
        ['posts', agentId, postGroupId],
        (oldData: GetAllPostsResponse) => {
          if (!oldData) return oldData; // 기존 데이터가 없다면 건드리지 않음
          const updatedPosts = oldData.posts.map((post: Post) => {
            const updateItem = updatePayload.posts.find(
              (item) => item.postId === post.id
            );
            if (updateItem) {
              return {
                ...post,
                displayOrder: updateItem.displayOrder,
                status: updateItem.status,
                uploadTime: updateItem.uploadTime,
              };
            }
            return post;
          });
          // 응답 데이터 형식에 맞게 postGroup은 그대로, posts 배열만 업데이트 합니다.
          return { ...oldData, posts: updatedPosts };
        }
      );

      return { previousData };
    },
    onError: (error, _, context) => {
      // 오류 발생 시 이전 상태로 롤백
      if (context?.previousData) {
        queryClient.setQueryData(
          ['posts', agentId, postGroupId],
          context.previousData
        );
      }
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
    onSettled: () => {
      // 최종적으로 최신 데이터를 불러오기 위해 쿼리 무효화
      queryClient.invalidateQueries(
        getAllPostsQueryOptions({
          agentId,
          postGroupId,
        })
      );
    },
  });
}
