import React, { ReactNode } from 'react';
import { createContext, useContext } from 'react';
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  MeasuringStrategy,
} from '@dnd-kit/core';
import { useDragAndDrop } from '../hooks/useDragAndDrop';
import { ContentItem } from '../compounds/ContentItem/ContentItem';
import { Post } from '@web/types';

export type DndItemData = Post;

type DndControlerProviderProps = {
  initialItems: DndItemData[];
  children: ReactNode;
  onDragEnd?: (items: DndItemData[]) => void;
};

type DndControlerContextType = ReturnType<typeof useDragAndDrop>;

const DndControlerContext = createContext<DndControlerContextType | null>(null);

export function useDndControler() {
  const context = useContext(DndControlerContext);
  if (!context) {
    throw new Error(
      'useDndControler는 DndControler.Provider 내부에서만 사용할 수 있습니다.'
    );
  }
  return context;
}

export function DndControlerProvider({
  initialItems,
  children,
  onDragEnd,
}: DndControlerProviderProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 5 } })
  );

  const dnd = useDragAndDrop({
    initialItems,
  });

  const { activeId, setActiveId, items } = dnd;
  const activeItem = items.find((item) => item.id === activeId);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        setActiveId(Number(active.id));
      }}
      onDragOver={dnd.handleDragOver}
      onDragEnd={(event) => {
        dnd.handleDragEnd(event);
        onDragEnd?.(items);
      }}
      measuring={{
        droppable: { strategy: MeasuringStrategy.Always },
      }}
      modifiers={[
        (args) => ({
          ...args.transform,
          scaleX: 1,
          scaleY: 1,
        }),
      ]}
    >
      <DndControlerContext.Provider value={dnd}>
        {children}
      </DndControlerContext.Provider>
      <DragOverlay style={{ backgroundColor: 'transparent' }}>
        {activeId && activeItem ? (
          <ContentItem
            summary={activeItem.summary}
            updatedAt={activeItem.updatedAt}
            onRemove={() => dnd.handleRemove(activeItem.id)}
            onModify={() => {}}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
