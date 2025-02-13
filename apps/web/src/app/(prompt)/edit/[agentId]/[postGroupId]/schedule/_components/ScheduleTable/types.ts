import { ReactNode } from 'react';
import { Post } from '@web/types';

export type Column = {
  id: string;
  label: string;
  width: string;
};

export type ScheduleTableProps = {
  columns: Column[];
  items: Post[];
  onDragEnd?: (items: Post[]) => void;
};

export type ScheduleTableRowProps = {
  id: number;
  children: ReactNode;
};
