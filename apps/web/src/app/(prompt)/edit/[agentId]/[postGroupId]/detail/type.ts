import { IdParams } from '@web/types';

export type EditDetailPageProps = {
  params: Omit<IdParams, 'postId'>;
};
