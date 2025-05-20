import React from 'react';
import { ContentGroupCard } from '../ContentGroupCard/ContentGroupCard';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@web/routes';
import { IdParams, PostGroupId } from '@web/types';
import { useModal } from '@repo/ui/hooks';
import { Modal } from '@repo/ui';
import { useDeletePostGroupMutation } from '@web/store/mutation/useDeletePostGroupMutation';
import { useGetAgentPostGroupsQuery } from '@web/store/query/useGetAgentPostGroupsQuery';

type PostGroupsContentGroupCardProps = {
  agentId: IdParams['agentId'];
};

export function PostGroupsContentGroupCard({
  agentId,
}: PostGroupsContentGroupCardProps) {
  const router = useRouter();
  const modal = useModal();

  const { data: agentPostGroups } = useGetAgentPostGroupsQuery({
    agentId: Number(agentId),
  });

  const { mutate: deletePostGroups } = useDeletePostGroupMutation({
    agentId: Number(agentId),
  });

  const handleDeletePostGroup = (postGroupId: PostGroupId) => {
    modal.confirm({
      title: '정말 삭제하시겠어요?',
      description: '삭제된 글은 복구할 수 없어요',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '삭제하기',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: () => {
          deletePostGroups(postGroupId);
        },
      },
    });
  };

  return (
    <ContentGroupCard
      postGroups={agentPostGroups.postGroups}
      onItemClick={(postGroupId) =>
        router.push(
          ROUTES.EDIT.ROOT({
            agentId: Number(agentId),
            postGroupId,
          })
        )
      }
      onItemRemove={(id) => {
        handleDeletePostGroup(id);
      }}
    />
  );
}
