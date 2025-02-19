import { Table } from '@web/components/common/Table';
import { DateDropdown } from '../DateDropdown/DateDropdown';
import { HourDropdown } from '../HourDropdown/HourDropdown';
import { MinuteDropdown } from '../MinuteDropdown/MinuteDropdown';
import { Column } from './types';
import { Post } from '@web/types';
import { useFormContext, Controller } from 'react-hook-form';

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
                      onChange={field.onChange}
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
