'use client';

import { DndController, useDndController } from '@web/components/common';
import * as style from './ScheduleTable.css';
import { ScheduleRows } from './ScheduleRows';
import { DraggableItems } from './DraggableItems';
import { Table } from '@web/components/common';
import { Column } from '@web/components/common';
import { AgentId } from '@web/types';
import { PostStatus } from '@web/types/post';

export type ScheduleTableProps = {
  agentId: AgentId;
  postStatus: PostStatus;
};

export function ScheduleTable({ agentId, postStatus }: ScheduleTableProps) {
  const { getItemsByStatus } = useDndController();
  const data = getItemsByStatus(postStatus);

  return (
    <div className={style.tableContainer}>
      <Table header={<Table.Header columns={columns} />}>
        <ScheduleRows columns={columns} data={data} />
      </Table>

      <div className={style.draggableOverlay}>
        <DndController.Droppable id={postStatus}>
          <div className={style.itemsContainer}>
            <DraggableItems data={data} agentId={agentId} />
          </div>
        </DndController.Droppable>
      </div>
    </div>
  );
}

const columns: Column[] = [
  {
    id: 'date',
    label: '날짜 변경',
    width: '17rem',
  },
  {
    id: 'amPm',
    label: '오전/오후',
    width: '10.8rem',
  },
  {
    id: 'time',
    label: '시',
    width: '10.8rem',
  },
  {
    id: 'minute',
    label: '분',
    width: '10.8rem',
  },
  {
    id: 'action',
    label: '순서 변경',
    width: '52.5rem',
  },
];
