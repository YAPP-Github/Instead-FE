'use client';

import { useState, useCallback } from 'react';
import { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Post, PostStatus } from '@web/types';

type UseDragAndDropProps = {
  initialItems: Record<PostStatus, Post[]>;
  onDragEnd?: (items: Record<PostStatus, Post[]>) => void;
};

export function useDragAndDrop({
  initialItems,
  onDragEnd,
}: UseDragAndDropProps) {
  const [items, setItems] = useState(initialItems);
  const [activeId, setActiveId] = useState<number | null>(null);

  const getItemsByStatus = useCallback(
    (status: PostStatus) => {
      return items[status] || [];
    },
    [items]
  );

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItemId = active.id;
    const allItems = Object.values(items).flat();
    const draggedItem = allItems.find((item) => item.id === draggedItemId);
    if (!draggedItem) return;

    // 컨테이너로 드래그하는 경우
    if (typeof over.id === 'string') {
      const targetStatus = over.id as PostStatus;
      if (draggedItem.status === targetStatus) return;

      const targetItems = items[targetStatus];
      const updatedItem = {
        ...draggedItem,
        status: targetStatus,
        displayOrder: over.data?.current?.sortable?.index ?? targetItems.length,
      };

      setItems({
        ...items,
        [draggedItem.status]: items[draggedItem.status]
          .filter((item) => item.id !== draggedItemId)
          .map((item, index) => ({ ...item, displayOrder: index })),
        [targetStatus]: [
          ...targetItems.slice(0, updatedItem.displayOrder),
          updatedItem,
          ...targetItems.slice(updatedItem.displayOrder),
        ].map((item, index) => ({ ...item, displayOrder: index })),
      });
      return;
    }

    // 아이템 위로 드래그하는 경우
    const overId = over.id;
    if (draggedItemId === overId) return;

    const overItem = allItems.find((item) => item.id === overId);
    if (!overItem) return;

    if (draggedItem.status === overItem.status) {
      // 같은 상태 내에서의 이동
      const currentItems = [...items[draggedItem.status]];
      const oldIndex = currentItems.findIndex(
        (item) => item.id === draggedItemId
      );
      const newIndex = currentItems.findIndex((item) => item.id === overId);
      const reorderedItems = arrayMove(currentItems, oldIndex, newIndex).map(
        (item, index) => ({ ...item, displayOrder: index })
      );

      setItems({
        ...items,
        [draggedItem.status]: reorderedItems,
      });
    } else {
      // 다른 상태로의 이동
      const targetItems = [...items[overItem.status]];
      const targetIndex = targetItems.findIndex((item) => item.id === overId);

      const updatedItem = {
        ...draggedItem,
        status: overItem.status,
        displayOrder: targetIndex,
      };

      setItems({
        ...items,
        [draggedItem.status]: items[draggedItem.status]
          .filter((item) => item.id !== draggedItemId)
          .map((item, index) => ({ ...item, displayOrder: index })),
        [overItem.status]: [
          ...targetItems.slice(0, targetIndex),
          updatedItem,
          ...targetItems.slice(targetIndex),
        ].map((item, index) => ({ ...item, displayOrder: index })),
      });
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;
    if (!over) return;

    if (onDragEnd) {
      onDragEnd(items);
    }
  };

  return {
    items,
    activeId,
    setActiveId,
    getItemsByStatus,
    handleDragOver,
    handleDragEnd,
    setItems,
  };
}
