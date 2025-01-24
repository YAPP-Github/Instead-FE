import { getMinutesAgo } from '../../utils';
import { contentItemStyle } from './ContentItem.css';
import { Icon, Text } from '@repo/ui';

export type ContentItemProps = {
  image?: string;
  title?: string;
  updatedAt: string;
  isLoading?: boolean;
};

export function ContentItem({
  image,
  title,
  updatedAt,
  isLoading,
}: ContentItemProps) {
  return (
    <div className={contentItemStyle}>
      {image ? (
        <div>x</div>
      ) : (
        <Icon name="note" color="grey300" type="stroke" size="3.2rem" />
      )}
      <Text fontSize={18} fontWeight="semibold" color="grey600">
        {title}
      </Text>
      <Text fontSize={14} fontWeight="medium" color="grey400">
        {`${getMinutesAgo('2025-01-24T17:00:00+09:00')}분 전`}
      </Text>
    </div>
  );
}
