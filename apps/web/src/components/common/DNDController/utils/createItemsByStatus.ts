import { Post, POST_STATUS, PostStatus } from '@web/types';

export function createItemsByStatus(items: Post[]): Record<PostStatus, Post[]> {
  return Object.values(POST_STATUS).reduce(
    (acc, status) => {
      acc[status] = items.filter((item) => item.status === status);
      return acc;
    },
    {} as Record<PostStatus, Post[]>
  );
}
