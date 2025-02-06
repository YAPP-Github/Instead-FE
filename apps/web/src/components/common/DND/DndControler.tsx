import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import { DroppableContent } from './compounds/DroppableContent/DroppableContent';
import { DraggableContentItem } from './compounds/DraggableContentItem/DraggableContentItem';
import { DndControlerProvider } from './context/DndContext';

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

export const DndControler = Object.assign(DndControlerProvider, {
  Droppable: DroppableContent,
  SortableList,
  Item: DraggableContentItem,
});

export { useDndControler } from './context/DndContext';
export type { DndItemData } from './context/DndContext';
