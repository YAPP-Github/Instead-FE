import { Skeleton } from '@repo/ui/Skeleton';
import { contentItemStyle, noShrinkStyle } from './SkeletonContentItem.css';
import { Icon } from '@repo/ui/Icon';
import { Text } from '@repo/ui/Text';

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
      <Text
        className={noShrinkStyle}
        fontSize={14}
        fontWeight="medium"
        color="grey400"
      >
        1분 전
      </Text>
    </div>
  );
}
