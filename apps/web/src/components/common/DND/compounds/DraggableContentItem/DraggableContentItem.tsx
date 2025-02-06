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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <ContentItem
      ref={setNodeRef}
      style={style}
      data-id={id}
      dragListeners={listeners}
      {...contentItemProps}
      {...attributes}
    />
  );
}
