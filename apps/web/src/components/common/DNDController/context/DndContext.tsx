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
import { useDragAndDrop } from '../hooks';
import { ContentItem } from '../compounds';
import { Post } from '@web/types';

export type DndItemData = Post;

type DndControllerProviderProps = {
  initialItems: DndItemData[];
  children: ReactNode;
  onDragEnd?: (items: DndItemData[]) => void;
};

type DndControllerContextType = ReturnType<typeof useDragAndDrop>;

const DndControllerContext = createContext<DndControllerContextType | null>(
  null
);

export function useDndController() {
  const context = useContext(DndControllerContext);
  if (!context) {
    throw new Error(
      'useDndController는 DndController.Provider 내부에서만 사용할 수 있습니다.'
    );
  }
  return context;
}

export function DndControllerProvider({
  initialItems,
  children,
  onDragEnd,
}: DndControllerProviderProps) {
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
      autoScroll={{
        enabled: false,
      }}
    >
      <DndControllerContext.Provider value={dnd}>
        {children}
      </DndControllerContext.Provider>
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
