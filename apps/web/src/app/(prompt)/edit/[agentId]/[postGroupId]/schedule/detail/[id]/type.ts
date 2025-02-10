import { EditPageProps } from '../../../types';

export type ScheduleDetailProps = EditPageProps & {
  params: {
    id: string;
  };
};
