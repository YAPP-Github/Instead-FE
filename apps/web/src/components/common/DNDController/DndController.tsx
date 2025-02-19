'use client';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ReactNode } from 'react';
import { DroppableContent, DraggableItem } from './compounds';
import { DndControllerProvider } from './context';

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
  Item: DraggableItem,
});

export { useDndController } from './context';
export type { DndItemData } from './context';
