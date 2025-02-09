import { CSS } from '@dnd-kit/utilities';
import {
  ContentItem,
  ContentItemProps,
} from '@web/components/common/DNDController/compounds/ContentItem/ContentItem';
import { useSortable } from '@dnd-kit/sortable';
import * as style from './DndTableRow.css';
import { Post } from '@web/types';
import { Column } from '../ScheduleTable/types';

type DndTableRowProps = Omit<ContentItemProps, 'dragListeners'> & {
  id: number;
  columns: Column[];
} & Post;

export function DndTableRow({
  id,
  columns,
  ...contentItemProps
}: DndTableRowProps) {
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

  const itemStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={itemStyle}
      data-id={id}
      {...attributes}
      {...listeners}
      className={style.dndTableRowStyle}
    >
      <div
        className={style.dndTableRowCellStyle}
        style={{ width: columns?.[0]?.width ?? 'auto' }}
      >
        드롭다운
      </div>
      <div
        className={style.dndTableRowCellStyle}
        style={{ width: columns?.[1]?.width ?? 'auto' }}
      >
        드롭다운
      </div>
      <div
        className={style.dndTableRowCellStyle}
        style={{ width: columns?.[2]?.width ?? 'auto' }}
      >
        드롭다운
      </div>
      <div
        className={style.contentItemWrapper}
        style={{ width: columns?.[3]?.width ?? 'auto' }}
      >
        <ContentItem {...contentItemProps} />
      </div>
    </div>
  );
}
