import { DndController } from '@web/components/common';
import { useUpdatePostsMutation } from '@web/store/mutation/useUpdatePostsMutation';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { IdParams } from '@web/types';
import React from 'react';
import { ContentItem } from '../ContentItem/ContentItem';
import { EditContent } from './EditContent';

type EditContentWithDNDProps = Omit<IdParams, 'postId'>;

export function EditContentWithDND({
  agentId,
  postGroupId,
}: EditContentWithDNDProps) {
  const { data: posts } = useGetAllPostsQuery({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  const { mutate: updatePosts } = useUpdatePostsMutation({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });

  return (
    <DndController
      initialItems={posts.data.posts}
      key={Object.values(posts.data.posts)
        .flat()
        .map((item) => `${item.id}-${item.displayOrder}-${item.status}`)
        .join(',')}
      onDragEnd={(updatedItems) => {
        const updatePayload = {
          posts: Object.values(updatedItems)
            .flat()
            .map((item) => ({
              postId: item.id,
              status: item.status,
              displayOrder: item.displayOrder,
              uploadTime: item.uploadTime,
            })),
        };
        updatePosts(updatePayload);
      }}
      renderDragOverlay={(activeItem) => (
        <ContentItem
          summary={activeItem.summary}
          updatedAt={activeItem.updatedAt}
        />
      )}
    >
      <EditContent
        params={{ agentId: Number(agentId), postGroupId: Number(postGroupId) }}
      />
    </DndController>
  );
}
