import { Post, PostsByStatus } from '@web/types';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export function useAdjacentPosts(posts: PostsByStatus, currentPost?: Post) {
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

  const allPosts = useMemo(() => {
    return Object.values(posts).flat();
  }, [posts]);

  const previousPost = useMemo(() => {
    if (!currentPost) return undefined;
    const candidates = allPosts.filter((p) => {
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
  }, [allPosts, currentPost]);

  const nextPost = useMemo(() => {
    if (!currentPost) return undefined;
    const candidates = allPosts.filter((p) => {
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
  }, [allPosts, currentPost]);

  const canMoveUp = Boolean(previousPost);
  const canMoveDown = Boolean(nextPost);

  const routePreviousPost = () => {
    if (previousPost) {
      router.push(`?postId=${previousPost.id}`);
    }
  };

  const routeNextPost = () => {
    if (nextPost) {
      router.push(`?postId=${nextPost.id}`);
    }
  };

  return {
    routePreviousPost,
    routeNextPost,
    canMoveUp,
    canMoveDown,
  };
}
