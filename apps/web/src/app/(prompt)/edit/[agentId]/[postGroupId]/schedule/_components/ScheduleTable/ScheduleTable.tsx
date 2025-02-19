'use client';

import { DndController, useDndController } from '@web/components/common';
import * as style from './ScheduleTable.css';
import { POST_STATUS } from '@web/types/post';
import { Column } from './types';
import { EditPageProps } from '../../../types';
import { ScheduleRows } from './ScheduleRows';
import { DraggableItems } from './DraggableItems';
import { Table } from '@web/components/common/Table';

export type ScheduleTableProps = {
  columns: Column[];
} & EditPageProps;

export function ScheduleTable({ columns, params }: ScheduleTableProps) {
  const { getItemsByStatus } = useDndController();
  const data = getItemsByStatus(POST_STATUS.READY_TO_UPLOAD);

  return (
    <div className={style.tableContainer}>
      <Table header={<Table.Header columns={columns} />}>
        <ScheduleRows
          columns={columns.slice(0, 3)}
          data={Array(data.length).fill(null)}
        />
      </Table>

      <div className={style.draggableOverlay}>
        <DndController.Droppable id={POST_STATUS.READY_TO_UPLOAD}>
          <div className={style.itemsContainer}>
            <DraggableItems data={data} params={params} />
          </div>
        </DndController.Droppable>
      </div>
    </div>
  );
}
