import { IdParams } from '@web/types';

export type EditPageProps = {
  params: Omit<IdParams, 'postId'>;
};

export type ScheduleFormValues = {
  schedules: Array<{
    postId: number;
    date: string;
    hour: string;
    minute: string;
    amPm: string;
  }>;
};
