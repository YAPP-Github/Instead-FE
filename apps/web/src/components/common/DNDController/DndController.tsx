import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import { DroppableContent } from './compounds/DroppableContent/DroppableContent';
import { DraggableContentItem } from './compounds/DraggableContentItem/DraggableContentItem';
import { DndControllerProvider } from './context/DndContext';

type SortableListProps = {
  items: (number | string)[];
  children: ReactNode;
};

function SortableList({ items, children }: SortableListProps) {
  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      {children}
    </SortableContext>
  );
}

export const DndController = Object.assign(DndControllerProvider, {
  Droppable: DroppableContent,
  SortableList,
  Item: DraggableContentItem,
});

export { useDndController } from './context/DndContext';
export type { DndItemData } from './context/DndContext';
