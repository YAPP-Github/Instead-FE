import { POST } from '@web/shared/server';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CreateFormValues } from '@web/app/create/[id]/types';
import { useToast } from '@repo/ui/hooks';
import { CreatedPost } from '@web/types/post';
import { AgentId } from '@web/types';
import { ROUTES } from '@web/routes';

export type MutationCreatePostsType = {
  agentId: AgentId;
};

export type MutationCreatePostsResponse = CreatedPost;

type MutationCreatePostsRequest = CreateFormValues;

/**
 *
 * 게시물 그룹 및 게시물 생성 API
 *
 * 에이전트에 새 게시물 그룹을 추가하고 게시물을 생성합니다.
 *
 * 1. 생성 방식을 나타내는 reference 필드 값에 따라 필요한 필드가 달라집니다.
 *
 * NONE (참고자료 X): newsCategory, imageUrls 필드를 모두 비워주세요.
 * NEWS (뉴스 참고): newsCategory를 지정하고, imageUrls를 비워주세요.
 * IMAGE (이미지 참고): imageUrls를 설정하고, newsCategory를 비워주세요.
 *
 * 2. 응답 본문에 eof가 포함됩니다.
 *
 * 게시물 그룹별 최대 게시물 생성 가능 횟수를 채우게 되면 eof가 true로 응답됩니다. 이 경우 추가 생성이 제한됩니다.
 */
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
      router.push(
        ROUTES.EDIT.ROOT({
          agentId: Number(agentId),
          postGroupId: Number(postGroupId),
        })
      );
    },
    onError: (error) => {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    },
  });
}
