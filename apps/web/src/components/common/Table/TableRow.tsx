import * as style from './TableRow.css';
import { Column } from '../../../app/(prompt)/edit/[agentId]/[postGroupId]/schedule/_components/ScheduleTable/types';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

export type CellData = {
  id: string;
  component: ReactNode;
};

export type TableRowProps = {
  columns: Column[];
  cells: CellData[];
} & ComponentPropsWithoutRef<'tr'>;

export function TableRow({
  columns,
  cells,
  className,
  ...restProps
}: TableRowProps) {
  return (
    <tr className={`${style.tableRowStyle} ${className}`} {...restProps}>
      {cells.map((cell, index) => (
        <td
          key={cell.id}
          className={style.tableRowCellStyle}
          style={{
            width: columns[index]?.width,
          }}
        >
          {cell.component}
        </td>
      ))}
    </tr>
  );
}
