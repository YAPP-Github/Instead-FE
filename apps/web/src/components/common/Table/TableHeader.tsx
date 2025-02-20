import * as style from './TableHeader.css';
import { Column } from './types';

export type TableHeaderProps = {
  columns: Column[];
};

export function TableHeader({ columns }: TableHeaderProps) {
  return (
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
  );
}
