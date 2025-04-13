'use client';

import { IconButton } from '@repo/ui/IconButton';
import {
  editArea,
  saveArea,
  skeletonEditArea,
  toolBar,
  tools,
  wrapper,
} from './PostEditor.css';
import { Button } from '@repo/ui/Button';
import { Skeleton } from '@repo/ui/Skeleton';
import { Spacing } from '@repo/ui/Spacing';

export function SkeletonEditor() {
  return (
    <div className={wrapper}>
      <div className={toolBar}>
        <div className={tools}>
          <IconButton icon="picture" />
          <IconButton icon="smile" />
        </div>

        <div className={saveArea}>
          <Button variant="neutral" size="small" disabled>
            저장
          </Button>
        </div>
      </div>

      <div className={skeletonEditArea}>
        <Skeleton width="100%" height="1.9rem" radius={16} />
        <Skeleton width="100%" height="1.9rem" radius={16} />
        <Skeleton width="100%" height="1.9rem" radius={16} />
        <Skeleton width="100%" height="1.9rem" radius={16} />
        <Skeleton width="28rem" height="1.9rem" radius={16} />
      </div>
    </div>
  );
}
