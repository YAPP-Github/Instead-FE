import { Skeleton } from '@repo/ui/Skeleton';
import { contentItemStyle, noShrinkStyle } from './ContentItem.css';
import { Icon } from '@repo/ui/Icon';

export function SkeletonContentItem() {
  return (
    <div className={contentItemStyle}>
      <Icon
        className={noShrinkStyle}
        name="note"
        color="grey300"
        type="stroke"
        size="3.2rem"
      />
      <Skeleton width="100%" height={'2.7rem'} radius={16} />
    </div>
  );
}
