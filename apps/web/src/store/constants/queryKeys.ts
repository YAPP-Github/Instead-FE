import { AgentId, PostGroupId, PostId } from '@web/types';

export const queryKeys = {
  posts: {
    all: (agentId: AgentId, postGroupId: PostGroupId) =>
      ['posts', agentId, postGroupId] as const,
    detail: (agentId: AgentId, postGroupId: PostGroupId, postId: PostId) =>
      ['posts', agentId, postGroupId, postId] as const,
  },
  news: {
    categories: ['news', 'categories'] as const,
  },
  postHistory: {
    detail: (postId: PostId) => ['postHistory', 'Post', postId] as const,
  },
  topics: {
    detail: (agentId: AgentId, postGroupId: PostGroupId) =>
      ['topics', agentId, postGroupId] as const,
  },
} as const;
