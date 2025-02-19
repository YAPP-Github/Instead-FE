import { IdParams } from './types';

type EditPagesParams = Omit<IdParams, 'postId'>;

export const ROUTES = {
  HOME: '/',
  JOIN: '/join',
  CREATE: '/create',
  EDIT: {
    ROOT: ({ agentId, postGroupId }: EditPagesParams) =>
      `/edit/${agentId}/${postGroupId}`,
    DETAIL: ({
      agentId,
      postGroupId,
      postId,
    }: IdParams & Pick<Required<IdParams>, 'postId'>) =>
      `/edit/${agentId}/${postGroupId}/detail?postId=${postId}`,
    SCHEDULE: ({ agentId, postGroupId }: EditPagesParams) =>
      `/edit/${agentId}/${postGroupId}/schedule`,
  },
} as const;
