import { useRouter } from 'next/navigation';
import { DndController } from '@web/components/common';
import { ContentItem } from '@web/components/common/DNDController/compounds';
import { ROUTES } from '@web/routes';
import { Post } from '@web/types';
import { EditPageProps } from '../../../types';

type DraggableItemsProps = {
  data: Post[];
} & EditPageProps;

export function DraggableItems({ data, params }: DraggableItemsProps) {
  const router = useRouter();

  return (
    <DndController.SortableList items={data.map((item) => item.id)}>
      {data.map((item) => (
        <DndController.Item id={item.id} key={item.id}>
          <ContentItem
            onClick={() => {
              router.push(
                ROUTES.SCHEDULE.DETAIL({
                  agentId: params.agentId,
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
