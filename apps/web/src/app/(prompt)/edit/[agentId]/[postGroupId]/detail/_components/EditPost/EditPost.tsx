'use client';

import { IconButton } from '@repo/ui/IconButton';
import {
  chipDropdownTrigger,
  controlBar,
  dropdownItem,
  postWrapper,
  titleWrapper,
  wrapper,
} from './EditPost.css';
import { Text } from '@repo/ui/Text';
import { Badge } from '@repo/ui/Badge';
import { PostEditor } from '../PostEditor/PostEditor';
import { EditPromptField } from '../EditPromptField/EditPromptField';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAdjacentPosts } from '../../_hooks/useAdjacentPosts';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { ROUTES } from '@web/routes';
import { Dropdown } from '@repo/ui/Dropdown';
import { Icon } from '@repo/ui/Icon';
import { useDeletePostMutation } from '@web/store/mutation/useDeletePostMutation';
import { useModal } from '@repo/ui/hooks';
import { Modal } from '@repo/ui/Modal';
import { Chip } from '@repo/ui/Chip';
import { PostStatus } from '@web/types';
import { ReactNode } from 'react';
import { useUpdatePostsMutation } from '@web/store/mutation/useUpdatePostsMutation';

const CHIP_DROPDOWN: Partial<Record<PostStatus, ReactNode>> = {
  GENERATED: (
    <Chip
      variant="grey"
      leftAddon={<Chip.Icon variant="grey" name="circle" size={12} />}
    >
      생성된 글
    </Chip>
  ),
  EDITING: (
    <Chip
      variant="purple"
      leftAddon={<Chip.Icon variant="purple" name="circle" size={12} />}
    >
      수정 중인 글
    </Chip>
  ),
  READY_TO_UPLOAD: (
    <Chip
      variant="green"
      leftAddon={<Chip.Icon variant="green" name="circle" size={12} />}
    >
      업로드할 글
    </Chip>
  ),
};

export function EditPost() {
  const router = useRouter();
  const modal = useModal();
  const methods = useForm();
  const { agentId, postGroupId } = useParams();
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const { data: posts } = useGetAllPostsQuery({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });
  const post = Object.values(posts.data.posts)
    .flat()
    .find((post) => String(post.id) === postId);

  const { routePreviousPost, routeNextPost, canMoveUp, canMoveDown } =
    useAdjacentPosts(posts.data.posts, post);

  const { mutate: deletePost } = useDeletePostMutation({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  const handleDeletePost = () => {
    modal.confirm({
      title: '정말 삭제하시겠어요?',
      description: '삭제된 글은 복구할 수 없어요',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '삭제하기',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: async () => {
          deletePost(Number(postId), {
            onSuccess: () => router.push(ROUTES.CREATE(Number(agentId))),
          });
        },
      },
    });
  };

  const { mutate: modifyPost } = useUpdatePostsMutation({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  const handleChipClick = (status: PostStatus) => {
    if (!postId) return;
    modifyPost({
      posts: [
        {
          postId: Number(postId),
          status: status,
        },
      ],
    });
  };

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
          <Dropdown>
            <Dropdown.Trigger>
              <IconButton icon="dots" />
            </Dropdown.Trigger>
            <Dropdown.Content align="right">
              <Dropdown.Item
                value="option1"
                className={dropdownItem}
                onClick={handleDeletePost}
              >
                <Icon name="trash" size="2.4rem" color="grey400" />
                <Text fontSize={18} fontWeight="medium" color="grey1000">
                  삭제하기
                </Text>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
          <IconButton
            icon="x"
            iconType="stroke"
            onClick={() =>
              router.push(
                ROUTES.EDIT.ROOT({
                  agentId: Number(agentId),
                  postGroupId: Number(postGroupId),
                })
              )
            }
          />
        </div>
      </div>

      <div className={postWrapper}>
        <Dropdown>
          <Dropdown.Trigger className={chipDropdownTrigger}>
            {CHIP_DROPDOWN[post?.status || 'EDITING']}
            <Dropdown.Icon
              name="arrowLineBottom"
              color="grey300"
              size={'2.4rem'}
            />
          </Dropdown.Trigger>
          <Dropdown.Content align="left">
            <Dropdown.Item
              value="option1"
              onClick={() => handleChipClick('GENERATED')}
            >
              {CHIP_DROPDOWN.GENERATED}
            </Dropdown.Item>
            <Dropdown.Item
              value="option1"
              onClick={() => handleChipClick('EDITING')}
            >
              {CHIP_DROPDOWN.EDITING}
            </Dropdown.Item>
            <Dropdown.Item
              value="option1"
              onClick={() => handleChipClick('READY_TO_UPLOAD')}
            >
              {CHIP_DROPDOWN.READY_TO_UPLOAD}
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
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
