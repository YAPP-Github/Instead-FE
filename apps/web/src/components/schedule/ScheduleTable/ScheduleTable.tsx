'use client';

import { DndController, useDndController } from '@web/components/common';
import * as style from './ScheduleTable.css';
import { ScheduleRows } from './ScheduleRows';
import { DraggableItems } from './DraggableItems';
import { Table } from '@web/components/common';
import { AgentId } from '@web/types';
import { PostStatus } from '@web/types/post';
import { columns } from './constants';

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
