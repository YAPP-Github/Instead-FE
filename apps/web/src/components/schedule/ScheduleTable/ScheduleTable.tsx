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
        <ScheduleRows
          columns={columns.slice(0, 3)}
          data={Array(data.length).fill(null)}
        />
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
    width: '16.6rem',
  },
  {
    id: 'time',
    label: '시 단위',
    width: '10.5rem',
  },
  {
    id: 'summary',
    label: '분 단위',
    width: '16.5rem',
  },
  {
    id: 'action',
    label: '순서 변경',
    width: '53.2rem',
  },
];
