import { IdParams } from '@web/types';

export type EditPageProps = {
  params: Omit<IdParams, 'postId'>;
};
