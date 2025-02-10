'use client';

import { DndController, useDndController } from '@web/components/common';
import * as style from './ScheduleTable.css';
import { POST_STATUS } from '@web/types/post';
import { TableRow } from '../TableRow/TableRow';
import { Column } from './types';
import { useRouter } from 'next/navigation';

export type ScheduleTableProps = {
  columns: Column[];
};

export function ScheduleTable({ columns }: ScheduleTableProps) {
  const { getItemsByStatus } = useDndController();
  const data = getItemsByStatus(POST_STATUS.READY_TO_UPLOAD);
  const router = useRouter();

  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr className={style.headerRow}>
            {columns.map((column) => (
              <th
                key={column.id}
                className={style.headerCell}
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
      </table>

      <DndController.Droppable id={POST_STATUS.READY_TO_UPLOAD}>
        <div className={style.itemsContainer}>
          <DndController.SortableList items={data.map((item) => item.id)}>
            {data.map((item) => (
              <DndController.Item id={item.id} key={item.id}>
                <TableRow
                  columns={columns}
                  {...item}
                  onClick={() => {
                    router.push(`./schedule/detail/${item.id}`);
                  }}
                />
              </DndController.Item>
            ))}
          </DndController.SortableList>
        </div>
      </DndController.Droppable>
    </div>
  );
}
