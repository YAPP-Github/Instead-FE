import { PropsWithChildren, ReactNode } from 'react';
import * as styles from './Table.css';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

type TableRootProps = PropsWithChildren & {
  header: ReactNode;
};

function TableRoot({ children, header }: TableRootProps) {
  return (
    <div className={styles.table}>
      {header}
      <div>{children}</div>
    </div>
  );
}

/**
 * Table 컴포넌트는 데이터를 표 형식으로 표시하는 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <Table>
 *   <Table.Header columns={columns} />
 *   <tbody>
 *     {data.map((row) => (
 *       <Table.Row
 *         key={row.id}
 *         columns={columns}
 *         cells={cells}
 *       />
 *     ))}
 *   </tbody>
 * </Table>
 * ```
 */
export const Table = Object.assign(TableRoot, {
  Header: TableHeader,
  Row: TableRow,
});

export type { TableRootProps };
export type { TableHeaderProps } from './TableHeader';
export type { TableRowProps, CellData } from './TableRow';
