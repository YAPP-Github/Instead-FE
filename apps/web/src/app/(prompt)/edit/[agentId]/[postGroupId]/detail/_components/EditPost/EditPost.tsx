'use client';

import { IconButton } from '@repo/ui/IconButton';
import { controlBar, postWrapper, titleWrapper, wrapper } from './EditPost.css';
import { Text } from '@repo/ui/Text';
import { Badge } from '@repo/ui/Badge';
import { PostEditor } from '../PostEditor/PostEditor';
import { EditPromptField } from '../EditPromptField/EditPromptField';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useGroupPostsQuery } from '@web/store/query/useGroupPostsQuery';
import { useAdjacentPosts } from '../../_hooks/useAdjacentPosts';
import { useEffect } from 'react';
import { queryClient } from '@web/store/query/QueryClientProvider';
import { getAllPostsQueryOptions } from '@web/store/query/useGetAllPostsQuery';

export function EditPost() {
  const router = useRouter();
  const methods = useForm();
  const { agentId, postGroupId } = useParams();
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const { data } = useGroupPostsQuery(Number(agentId), Number(postGroupId));
  const post = data?.data?.posts.find((post) => String(post.id) === postId);

  console.log('dfddf', data, post);
  console.log('postId:', postId, 'Converted:', Number(postId));

  const { routePreviousPost, routeNextPost, canMoveUp, canMoveDown } =
    useAdjacentPosts(data?.data?.posts, post);

  // TODO 제거 예정 UT용...
  useEffect(() => {
    queryClient.invalidateQueries(
      getAllPostsQueryOptions({
        agentId: Number(agentId),
        postGroupId: Number(postGroupId),
      })
    );
    queryClient.invalidateQueries({
      queryKey: ['postGroup', 'Agents'],
    });
  }, []);

  return (
    <div className={wrapper}>
      <div className={controlBar}>
        <div>
          <IconButton
            icon="arrowLineTop"
            disabled={!canMoveUp}
            onClick={routePreviousPost}
          />
          <IconButton
            icon="arrowLineBottom"
            disabled={!canMoveDown}
            onClick={routeNextPost}
          />
        </div>

        <div>
          <IconButton icon="dots" />
          <IconButton
            icon="x"
            iconType="stroke"
            onClick={() => router.push(`/edit/${agentId}/${postGroupId}`)}
          />
        </div>
      </div>

      <div className={postWrapper}>
        <div className={titleWrapper}>
          <Text color="grey1000" fontSize={28} fontWeight="bold">
            {post?.summary}
          </Text>
          <Badge size="large" variant="neutral" shape="square">
            요약
          </Badge>
        </div>
        <FormProvider {...methods}>
          <PostEditor />
          <EditPromptField />
        </FormProvider>
      </div>
    </div>
  );
}
