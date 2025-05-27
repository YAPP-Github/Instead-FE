import { Skeleton, Spacing } from '@repo/ui';
import * as style from './style.css';
import { TitleWithDescription } from '@web/components/common/TitleWithDescription/TitleWithDescription';
import { columns } from '@web/components/schedule/ScheduleTable/constants';
import { Table } from '@web/components/common';

export function ScheduleContentSkeleton() {
  const totalWidth = columns.reduce((acc, column) => {
    const width = parseFloat(column.width);
    return acc + width;
  }, 0);

  return (
    <div className={style.dndSectionStyle}>
      <TitleWithDescription
        title="업로드 예약 일정"
        rightTitle={<Skeleton width="4.8rem" height="4rem" radius={4} />}
        description="개별 글의 업로드 날짜와 순서를 변경할 수 있어요"
      />
      <div className={style.tableContainer}>
        <Table header={<Table.Header columns={columns} />}>
          <Spacing size={16} />
          <Skeleton width={`${totalWidth}rem`} height="45rem" radius={4} />
        </Table>
      </div>
    </div>
  );
}
