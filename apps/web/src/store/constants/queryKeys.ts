import { AgentId, PostGroupId, PostId } from '@web/types';

export const queryKeys = {
  posts: {
    all: (agentId: AgentId, postGroupId: PostGroupId) =>
      ['posts', agentId, postGroupId] as const,
    postGroups: (agentId: AgentId) => ['posts', agentId] as const,
    detail: (agentId: AgentId, postGroupId: PostGroupId, postId: PostId) =>
      ['posts', agentId, postGroupId, postId] as const,
  },
  news: {
    categories: ['news', 'categories'] as const,
  },
  postHistory: {
    detail: (postId: PostId) => ['postHistory', 'Post', postId] as const,
  },
  agents: {
    agents: ['agents'] as const,
    detail: (agentId: AgentId) => ['agents', 'detail', agentId] as const,
    reserved: (agentId: AgentId) => ['agents', 'reserved', agentId] as const,
  },
  topics: {
    detail: (agentId: AgentId, postGroupId: PostGroupId) =>
      ['topics', agentId, postGroupId] as const,
  },
} as const;
