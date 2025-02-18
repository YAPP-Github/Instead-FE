'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ComponentPropsWithoutRef } from 'react';

type DraggableItemProps = {
  id: number | string;
} & Omit<ComponentPropsWithoutRef<'div'>, 'id'>;

export function DraggableItem({
  id,
  children,
  className = '',
}: DraggableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'item',
      id: id,
    },
  });

  const itemstyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={itemstyle}
      data-id={id}
      {...attributes}
      {...listeners}
      className={className}
    >
      {children}
    </div>
  );
}
