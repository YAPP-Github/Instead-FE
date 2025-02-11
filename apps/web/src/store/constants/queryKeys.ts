export const queryKeys = {
  posts: {
    all: (agentId: number | string, postGroupId: number | string) =>
      ['posts', agentId, postGroupId] as const,
  },
  news: {
    categories: ['news', 'categories'] as const,
  },
  postHistory: {
    detail: (postId: number) => ['postHistory', 'Post', postId] as const,
  },
} as const;
