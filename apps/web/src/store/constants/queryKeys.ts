import { AgentId, PostGroupId, PostId } from '@web/types';

export const queryKeys = {
  posts: {
    all: (agentId: AgentId, postGroupId: PostGroupId) =>
      ['posts', agentId, postGroupId] as const,
  },
  news: {
    categories: ['news', 'categories'] as const,
  },
  postHistory: {
    detail: (postId: PostId) => ['postHistory', 'Post', postId] as const,
  },
  x: ['x'] as const,
} as const;
