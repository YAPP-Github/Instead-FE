import { IdParams } from '@web/types';

export type SchedulePageProps = {
  params: Pick<IdParams, 'agentId'>;
};

export type ScheduleFormValues = {
  schedules: Array<{
    postId: number;
    date: string;
    hour: string;
    minute: string;
  }>;
};
