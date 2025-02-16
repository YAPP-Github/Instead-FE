'use client';

import { useState } from 'react';
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
  const [items, setItems] = useState<Record<PostStatus, Post[]>>(initialItems);
  const [activeId, setActiveId] = useState<number | null>(null);

  const getItemsByStatus = (status: PostStatus) => {
    return items[status] || [];
  };

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

      setItems((prev) => {
        const targetItems = prev[targetStatus];
        const updatedItem = {
          ...draggedItem,
          status: targetStatus,
          displayOrder: targetItems.length, // 마지막 순서로 이동
        };

        return {
          ...prev,
          [draggedItem.status]: prev[draggedItem.status]
            .filter((item) => item.id !== draggedItemId)
            .map((item, index) => ({ ...item, displayOrder: index })),
          [targetStatus]: [...targetItems, updatedItem],
        };
      });
      return;
    }

    // 아이템 위로 드래그하는 경우
    const overId = over.id;
    if (draggedItemId === overId) return;

    const overItem = allItems.find((item) => item.id === overId);
    if (!overItem) return;

    setItems((prev) => {
      if (draggedItem.status === overItem.status) {
        // 같은 상태 내에서의 이동
        const currentItems = [...prev[draggedItem.status]];
        const oldIndex = currentItems.findIndex(
          (item) => item.id === draggedItemId
        );
        const newIndex = currentItems.findIndex((item) => item.id === overId);
        const reorderedItems = arrayMove(currentItems, oldIndex, newIndex).map(
          (item, index) => ({ ...item, displayOrder: index })
        );

        return {
          ...prev,
          [draggedItem.status]: reorderedItems,
        };
      } else {
        // 다른 상태로의 이동
        const targetItems = [...prev[overItem.status]];
        const targetIndex = targetItems.findIndex((item) => item.id === overId);
        const updatedItem = {
          ...draggedItem,
          status: overItem.status,
          displayOrder: targetIndex,
        };

        targetItems.splice(targetIndex, 0, updatedItem);

        return {
          ...prev,
          [draggedItem.status]: prev[draggedItem.status]
            .filter((item) => item.id !== draggedItemId)
            .map((item, index) => ({ ...item, displayOrder: index })),
          [overItem.status]: targetItems.map((item, index) => ({
            ...item,
            displayOrder: index,
          })),
        };
      }
    });
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
