import * as style from './TableHeader.css';
import { Column } from './types';

export type TableHeaderProps = {
  columns: Column[];
};

export function TableHeader({ columns }: TableHeaderProps) {
  const gridTemplateColumns = columns.map((c) => c.width).join(' ');

  return (
    <div
      className={style.headerRow}
      style={{ display: 'grid', gridTemplateColumns }}
      role="row"
    >
      {columns.map((column) => (
        <div key={column.id} className={style.headerCell} role="columnheader">
          {column.label}
        </div>
      ))}
    </div>
  );
}
