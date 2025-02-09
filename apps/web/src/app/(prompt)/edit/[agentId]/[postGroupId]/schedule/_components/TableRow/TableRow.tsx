import {
  ContentItem,
  ContentItemProps,
} from '@web/components/common/DNDController/compounds/ContentItem/ContentItem';
import * as style from './TableRow.css';
import { Post } from '@web/types';
import { Column } from '../ScheduleTable/types';

type TableRowProps = Omit<ContentItemProps, 'dragListeners'> & {
  columns: Column[];
} & Post;

export function TableRow({ columns, ...contentItemProps }: TableRowProps) {
  return (
    <div className={style.tableRowStyle}>
      <div
        className={style.tableRowCellStyle}
        style={{ width: columns?.[0]?.width ?? 'auto' }}
      >
        드롭다운
      </div>
      <div
        className={style.tableRowCellStyle}
        style={{ width: columns?.[1]?.width ?? 'auto' }}
      >
        드롭다운
      </div>
      <div
        className={style.tableRowCellStyle}
        style={{ width: columns?.[2]?.width ?? 'auto' }}
      >
        드롭다운
      </div>
      <div
        className={style.contentItemWrapper}
        style={{ width: columns?.[3]?.width ?? 'auto' }}
      >
        <ContentItem {...contentItemProps} />
      </div>
    </div>
  );
}
