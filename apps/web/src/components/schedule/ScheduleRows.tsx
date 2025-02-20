import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { DateDropdown } from '../../DateDropdown';
import { Table } from '../../Table';

export function ScheduleRows({
  columns,
  data,
}: {
  columns: Column[];
  data: Post[];
}) {
  const { control } = useFormContext();

  const handleFieldChange = useCallback(
    (index: number, field: string, value: string) => {
      // Implementation of handleFieldChange
    },
    []
  );

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
                      onChange={(value) =>
                        handleFieldChange(index, 'date', value)
                      }
                    />
                  )}
                />
              ),
            },
            // hour와 minute도 비슷하게 수정
          ]}
        />
      ))}
    </tbody>
  );
}
