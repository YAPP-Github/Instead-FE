'use client';

import { useDroppable } from '@dnd-kit/core';
import { ReactNode } from 'react';
import * as style from './DroppableContent.css';

type DroppableContentProps = {
  id: string;
  children: ReactNode;
};

export function DroppableContent({ id, children }: DroppableContentProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: 'container',
      status: id,
      accepts: ['item'],
    },
  });

  return (
    <div ref={setNodeRef} className={style.droppableContainer}>
      {children}
    </div>
  );
}
