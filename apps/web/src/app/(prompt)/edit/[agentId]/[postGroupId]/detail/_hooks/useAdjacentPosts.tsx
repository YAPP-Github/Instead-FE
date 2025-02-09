import { Post } from '@web/types';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export function useAdjacentPosts(posts: Post[], currentPost?: Post) {
  const router = useRouter();

  // TODO 추후 PostStatusType에서 골라오도록
  const statusPriority: { [key in Post['status']]: number } = {
    GENERATED: 3,
    EDITING: 2,
    READY_TO_UPLOAD: 1,
    UPLOAD_RESERVED: 0,
    UPLOADED: -1,
    UPLOAD_FAILED: -2,
  };

  const previousPost = useMemo(() => {
    if (!currentPost) return undefined;
    const candidates = posts.filter((p) => {
      if (p.status === currentPost.status) {
        return p.displayOrder < currentPost.displayOrder;
      }
      return statusPriority[p.status] > statusPriority[currentPost.status];
    });
    const sorted = candidates.sort((a, b) => {
      if (a.status !== b.status) {
        return statusPriority[a.status] - statusPriority[b.status];
      }
      return b.displayOrder - a.displayOrder;
    });
    return sorted[0];
  }, [posts, currentPost]);

  const nextPost = useMemo(() => {
    if (!currentPost) return undefined;
    const candidates = posts.filter((p) => {
      if (p.status === currentPost.status) {
        return p.displayOrder > currentPost.displayOrder;
      }
      return statusPriority[p.status] < statusPriority[currentPost.status];
    });
    const sorted = candidates.sort((a, b) => {
      if (a.status !== b.status) {
        return statusPriority[b.status] - statusPriority[a.status];
      }
      return a.displayOrder - b.displayOrder;
    });
    return sorted[0];
  }, [posts, currentPost]);

  const canMoveUp = Boolean(previousPost);
  const canMoveDown = Boolean(nextPost);
  const routePreviousPost = () => {
    router.push(`?postId=${previousPost?.id}`);
  };
  const routeNextPost = () => {
    router.push(`?postId=${nextPost?.id}`);
  };

  return {
    routePreviousPost,
    routeNextPost,
    canMoveUp,
    canMoveDown,
  };
}
