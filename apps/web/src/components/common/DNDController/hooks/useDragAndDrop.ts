import { useState, useEffect } from 'react';
import { DragEndEvent, DragOverEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Post } from '@web/types';

type UseDragAndDropProps = {
  initialItems: Post[];
  onItemsChange?: (items: Post[]) => void;
  onDragEnd?: (items: Post[]) => void;
};

export function useDragAndDrop({
  initialItems,
  onItemsChange,
  onDragEnd,
}: UseDragAndDropProps) {
  const [items, setItems] = useState<Post[]>(initialItems);
  const [activeId, setActiveId] = useState<number | null>(null);

  // initialItems가 변경될 때마다 items 상태 업데이트
  useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const getItemsByStatus = (status: Post['status']) =>
    items.filter((item) => item.status === status);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const draggedItemId = Number(active.id);
    const draggedItem = items.find((item) => item.id === draggedItemId);

    if (!draggedItem) return;

    // 아이템 위에 있는 경우
    if (typeof over.id === 'number') {
      const overId = over.id;
      if (draggedItemId === overId) return;

      const overItem = items.find((item) => item.id === overId);
      if (!overItem) return;

      setItems((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === draggedItemId);
        const newIndex = prev.findIndex((item) => item.id === overId);

        // 드래그 방향이 아래쪽인지 확인
        const isBelow = event.delta.y > 0;

        // 최종 삽입 위치 계산
        let finalIndex = newIndex;
        if (oldIndex < newIndex && !isBelow) {
          finalIndex--;
        } else if (oldIndex > newIndex && isBelow) {
          finalIndex++;
        }

        // 다른 상태로 이동하는 경우
        if (draggedItem.status !== overItem.status) {
          const updatedItems = [...prev];
          updatedItems[oldIndex] = { ...draggedItem, status: overItem.status };
          return arrayMove(updatedItems, oldIndex, finalIndex);
        }

        // 같은 상태 내에서 이동하는 경우
        return arrayMove(prev, oldIndex, finalIndex);
      });
      return;
    }

    // 컨테이너(상태) 위에 있는 경우는 이전과 동일
    const targetStatus = over.id as Post['status'];
    if (draggedItem.status === targetStatus) return;

    setItems((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === draggedItemId);
      const itemsInTargetStatus = prev.filter(
        (item) => item.status === targetStatus
      );
      const lastItem = itemsInTargetStatus[itemsInTargetStatus.length - 1];
      const lastItemIndex = lastItem
        ? prev.findIndex((item) => item.id === lastItem.id)
        : -1;

      const updatedItems = [...prev];
      updatedItems[oldIndex] = { ...draggedItem, status: targetStatus };

      const finalIndex =
        lastItemIndex === -1 ? prev.length - 1 : lastItemIndex + 1;

      return arrayMove(updatedItems, oldIndex, finalIndex);
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

      const newItems = items.map((item) =>
        item.id === draggedItemId ? { ...item, status: targetStatus } : item
      );
      setItems(newItems);
      onDragEnd?.(newItems);
      return;
    }

    // 같은 상태 내에서 순서 변경
    const overId = Number(over.id);
    if (draggedItemId === overId) return;

    const oldIndex = items.findIndex((item) => item.id === draggedItemId);
    const newIndex = items.findIndex((item) => item.id === overId);

    const newItems = arrayMove(items, oldIndex, newIndex);
    setItems(newItems);
    onDragEnd?.(newItems);
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
