import { Post } from '@web/types';

export function createItemsByStatus(
  items: Post[]
): Record<Post['status'], Post[]> {
  return items.reduce(
    (acc, item) => {
      if (!acc[item.status]) acc[item.status] = [];
      acc[item.status].push(item);
      return acc;
    },
    {} as Record<Post['status'], Post[]>
  );
}
