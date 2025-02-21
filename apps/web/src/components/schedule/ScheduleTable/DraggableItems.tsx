import { useRouter } from 'next/navigation';
import { DndController } from '@web/components/common';
import { ContentItem } from '@web/components/common/DNDController/compounds';
import { ROUTES } from '@web/routes';
import { AgentId, Post } from '@web/types';

type DraggableItemsProps = {
  data: Post[];
  agentId: AgentId;
};

export function DraggableItems({ data, agentId }: DraggableItemsProps) {
  const router = useRouter();

  return (
    <DndController.SortableList items={data.map((item) => item.id)}>
      {data.map((item) => (
        <DndController.Item id={item.id} key={item.id}>
          <ContentItem
            onClick={() => {
              router.push(
                ROUTES.SCHEDULE.DETAIL({
                  agentId,
                  postGroupId: item.postGroupId,
                  postId: item.id,
                })
              );
            }}
            {...item}
          />
        </DndController.Item>
      ))}
    </DndController.SortableList>
  );
}
