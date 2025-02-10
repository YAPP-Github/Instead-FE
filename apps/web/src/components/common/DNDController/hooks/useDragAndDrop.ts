import { useState } from 'react';
import { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Post } from '@web/types';
import { createItemsByStatus } from '../utils';

type UseDragAndDropProps = {
  initialItems: Post[];
  onItemsChange?: (items: Post[]) => void;
  onDragEnd?: (items: Post[]) => void;
};

function updateDisplayOrders(items: Post[]) {
  const itemsByStatus = createItemsByStatus(items);

  Object.values(itemsByStatus).forEach((statusItems) => {
    statusItems.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    statusItems.forEach((item, index) => {
      item.displayOrder = index + 1;
    });
  });

  return Object.values(itemsByStatus).flat();
}

export function useDragAndDrop({
  initialItems,
  onItemsChange,
  onDragEnd,
}: UseDragAndDropProps) {
  const [items, setItems] = useState<Post[]>(initialItems);
  const [activeId, setActiveId] = useState<number | null>(null);

  const getItemsByStatus = (status: Post['status']) => {
    return items
      .filter((item) => item.status === status)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItemId = Number(active.id);
    const draggedItem = items.find((item) => item.id === draggedItemId);
    if (!draggedItem) return;

    // 아이템 위로 드래그하는 경우
    if (typeof over.id === 'number') {
      const overId = over.id;
      if (draggedItemId === overId) return;

      const overItem = items.find((item) => item.id === overId);
      if (!overItem) return;

      setItems((prev) => {
        const itemsByStatus = createItemsByStatus(prev);
        const sourceStatus = draggedItem.status;
        const targetStatus = overItem.status;

        if (sourceStatus === targetStatus) {
          // 같은 상태 내에서의 이동
          const statusItems = itemsByStatus[sourceStatus];
          const oldIndex = statusItems.findIndex(
            (item) => item.id === draggedItemId
          );
          const newIndex = statusItems.findIndex((item) => item.id === overId);
          itemsByStatus[sourceStatus] = arrayMove(
            statusItems,
            oldIndex,
            newIndex
          );
        } else {
          // 다른 상태로의 이동
          itemsByStatus[sourceStatus] = itemsByStatus[sourceStatus].filter(
            (item) => item.id !== draggedItemId
          );
          const targetItems = itemsByStatus[targetStatus];
          const targetIndex = targetItems.findIndex(
            (item) => item.id === overId
          );
          targetItems.splice(targetIndex, 0, {
            ...draggedItem,
            status: targetStatus,
          });
        }

        const newItems = updateDisplayOrders(
          Object.values(itemsByStatus).flat()
        );
        onDragEnd?.(newItems);
        return newItems;
      });
      return;
    }

    // 컨테이너로 드래그하는 경우
    const targetStatus = over.id as Post['status'];
    if (draggedItem.status === targetStatus) return;

    setItems((prev) => {
      const itemsByStatus = createItemsByStatus(prev);

      itemsByStatus[draggedItem.status] = itemsByStatus[
        draggedItem.status
      ].filter((item) => item.id !== draggedItemId);

      if (!itemsByStatus[targetStatus]) itemsByStatus[targetStatus] = [];
      itemsByStatus[targetStatus].push({
        ...draggedItem,
        status: targetStatus,
      });

      const newItems = updateDisplayOrders(Object.values(itemsByStatus).flat());
      onDragEnd?.(newItems);
      return newItems;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItemId = Number(active.id);
    const draggedItem = items.find((item) => item.id === draggedItemId);

    if (!draggedItem) return;

    // 드롭 영역(상태)으로 이동하는 경우
    if (typeof over.id === 'string') {
      const targetStatus = over.id as Post['status'];
      if (draggedItem.status === targetStatus) return;

      setItems((prev) => {
        const itemsByStatus = createItemsByStatus(prev);
        const sourceItems = itemsByStatus[draggedItem.status].filter(
          (item) => item.id !== draggedItemId
        );
        const targetItems = itemsByStatus[targetStatus] || [];

        // 이동된 아이템을 타겟 상태의 마지막에 추가
        const updatedItem = { ...draggedItem, status: targetStatus };
        targetItems.push(updatedItem);

        // displayOrder 재계산
        sourceItems.forEach((item, index) => {
          item.displayOrder = index + 1;
        });
        targetItems.forEach((item, index) => {
          item.displayOrder = index + 1;
        });

        itemsByStatus[draggedItem.status] = sourceItems;
        itemsByStatus[targetStatus] = targetItems;

        const newItems = updateDisplayOrders(
          Object.values(itemsByStatus).flat()
        );
        onDragEnd?.(newItems);
        return newItems;
      });
      return;
    }

    // 같은 상태 내에서 순서 변경
    const overId = Number(over.id);
    if (draggedItemId === overId) return;

    setItems((prev) => {
      const itemsByStatus = createItemsByStatus(prev);
      const statusItems = itemsByStatus[draggedItem.status];
      const oldIndex = statusItems.findIndex(
        (item) => item.id === draggedItemId
      );
      const newIndex = statusItems.findIndex((item) => item.id === overId);
      const reorderedItems = arrayMove(statusItems, oldIndex, newIndex);

      reorderedItems.forEach((item, index) => {
        item.displayOrder = index + 1;
      });

      itemsByStatus[draggedItem.status] = reorderedItems;
      const newItems = updateDisplayOrders(Object.values(itemsByStatus).flat());
      onDragEnd?.(newItems);
      return newItems;
    });
  };

  const handleRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const setItemsWithCallback = (newItems: Post[]) => {
    setItems(newItems);
    onItemsChange?.(newItems);
  };

  return {
    items,
    activeId,
    setActiveId,
    getItemsByStatus,
    handleDragOver,
    handleDragEnd,
    handleRemove,
    setItemsWithCallback,
  };
}
