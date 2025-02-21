import { Table } from '@web/components/common';
import { DateDropdown } from '../DateDropdown/DateDropdown';
import { HourDropdown } from '../HourDropdown/HourDropdown';
import { MinuteDropdown } from '../MinuteDropdown/MinuteDropdown';
import { Post } from '@web/types';
import { useFormContext, Controller } from 'react-hook-form';
import { Column } from '@web/components/common';

export function ScheduleRows({
  columns,
  data,
}: {
  columns: Column[];
  data: Post[];
}) {
  const { control } = useFormContext();

  return (
    <tbody>
      {data.map((_, index) => (
        <Table.Row
          key={`row-${index}`}
          columns={columns}
          cells={[
            {
              id: 'date',
              component: (
                <Controller
                  control={control}
                  name={`schedules.${index}.date`}
                  render={({ field }) => (
                    <DateDropdown
                      value={field.value}
                      onChange={(date) => {
                        if (date) {
                          const localDate = new Date(date);
                          const utcDate = new Date(
                            Date.UTC(
                              localDate.getFullYear(),
                              localDate.getMonth(),
                              localDate.getDate()
                            )
                          );
                          field.onChange(utcDate.toISOString().split('T')[0]); // YYYY-MM-DD 형식으로 변환하여 폼에 반영
                        } else {
                          field.onChange(null); // 날짜가 선택되지 않은 경우
                        }
                      }}
                    />
                  )}
                />
              ),
            },
            {
              id: 'time',
              component: (
                <Controller
                  control={control}
                  name={`schedules.${index}.hour`}
                  render={({ field }) => (
                    <HourDropdown
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              ),
            },
            {
              id: 'minute',
              component: (
                <Controller
                  control={control}
                  name={`schedules.${index}.minute`}
                  render={({ field }) => (
                    <MinuteDropdown
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              ),
            },
          ]}
        />
      ))}
    </tbody>
  );
}
