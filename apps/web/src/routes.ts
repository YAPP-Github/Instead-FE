import { IdParams } from './types';

type EditPagesParams = Omit<IdParams, 'postId'>;

export const ROUTES = {
  HOME: '/', // TODO: 수정 필요
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
  PERSONALIZE: (agentId: IdParams['agentId']) => `/personalize/${agentId}`,
  SCHEDULE: {
    ROOT: (agentId: IdParams['agentId']) => `/schedule/${agentId}`,
    DETAIL: ({ agentId, postGroupId, postId }: IdParams) =>
      `/schedule/${agentId}/${postGroupId}/${postId}`,
  },
} as const;
