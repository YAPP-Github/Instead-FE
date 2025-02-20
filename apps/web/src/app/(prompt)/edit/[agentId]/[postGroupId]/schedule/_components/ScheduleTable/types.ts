import { ReactNode } from 'react';
import { Post } from '@web/types';
import { Column } from '@web/components/common/Table/types';

export type ScheduleTableProps = {
  columns: Column[];
  items: Post[];
  onDragEnd?: (items: Post[]) => void;
};

export type ScheduleTableRowProps = {
  id: number;
  children: ReactNode;
};
