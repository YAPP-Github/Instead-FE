'use client';

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
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDragAndDrop } from '../hooks';
import { Post, PostStatus } from '@web/types';

export type DndItemData = Post;

type DndControllerProviderProps = {
  initialItems: Record<PostStatus, Post[]>;
  children: ReactNode;
  onDragEnd?: (items: Record<PostStatus, Post[]>) => void;
  disabled?: boolean;
  renderDragOverlay?: (activeItem: Post) => ReactNode;
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
  disabled,
  renderDragOverlay,
}: DndControllerProviderProps) {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const dnd = useDragAndDrop({
    initialItems,
    onDragEnd,
  });

  const activeItem = dnd.activeId
    ? Object.values(dnd.items)
        .flat()
        .find((item) => item.id === dnd.activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={
        disabled
          ? undefined
          : ({ active }) => {
              dnd.setActiveId(Number(active.id));
            }
      }
      onDragOver={disabled ? undefined : dnd.handleDragOver}
      onDragEnd={
        disabled
          ? undefined
          : (event) => {
              dnd.handleDragEnd(event);
            }
      }
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
        },
      }}
    >
      <SortableContext
        items={Object.values(dnd.items)
          .flat()
          .map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <DndControllerContext.Provider value={dnd}>
          {children}
        </DndControllerContext.Provider>
      </SortableContext>
      <DragOverlay
        dropAnimation={{
          duration: 300,
          easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)',
        }}
      >
        {activeItem && renderDragOverlay && renderDragOverlay(activeItem)}
      </DragOverlay>
    </DndContext>
  );
}
