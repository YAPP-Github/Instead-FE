import { IdParams } from '@web/types';

export type ScheduleDetailPageProps = {
  params: IdParams & Pick<Required<IdParams>, 'postId'>;
};
