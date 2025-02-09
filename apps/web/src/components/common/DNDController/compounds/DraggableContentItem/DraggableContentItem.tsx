import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ContentItem, ContentItemProps } from '../ContentItem/ContentItem';

type DraggableContentItemProps = Omit<ContentItemProps, 'dragListeners'> & {
  id: number;
};

export function DraggableContentItem({
  id,
  ...contentItemProps
}: DraggableContentItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'item',
      id: id,
    },
  });

  const itemstyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={itemstyle}
      data-id={id}
      {...attributes}
      {...listeners}
    >
      <ContentItem {...contentItemProps} />
    </div>
  );
}
