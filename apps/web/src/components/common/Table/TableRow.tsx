import * as style from './TableRow.css';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Column } from './types';

export type CellData = {
  id: string;
  component: ReactNode;
};

export type TableRowProps = {
  columns: Column[];
  cells: CellData[];
} & ComponentPropsWithoutRef<'div'>;

export function TableRow({
  columns,
  cells,
  className,
  ...restProps
}: TableRowProps) {
  const gridTemplateColumns = columns.map((c) => c.width).join(' ');

  return (
    <div
      className={`${style.tableRowStyle} ${className}`}
      style={{ display: 'grid', gridTemplateColumns }}
      role="row"
      {...restProps}
    >
      {cells.map((cell) => (
        <div key={cell.id} className={style.tableRowCellStyle} role="cell">
          {cell.component}
        </div>
      ))}
    </div>
  );
}
