import { Text } from '@repo/ui/Text';
import {
  card,
  cardText,
  leftText,
  uploadContentItem,
  uploadContentSummary,
} from './UploadContentCard.css';
import { Button } from '@repo/ui/Button';
import { Post } from '@web/types';
import { getFormattedDatetime } from '@web/utils';

export type UploadContentCardProps = {
  text: string;
  onMoreButtonClick: () => void;
  items: Post[];
  onItemClick: (post: Post) => void;
};

export function UploadContentCard({
  text,
  onMoreButtonClick,
  items,
  onItemClick,
}: UploadContentCardProps) {
  return (
    <div className={card}>
      <div className={cardText}>
        <div className={leftText}>
          <Text fontSize={22} fontWeight="semibold" color="grey800">
            {text}
          </Text>
          <Text fontSize={22} fontWeight="medium" color="primary700">
            {items?.length}
          </Text>
        </div>
        <Button onClick={onMoreButtonClick} variant="text" size="small">
          더보기
        </Button>
      </div>
      <div>
        {items.map((item) => (
          <UploadContentItem
            key={item.id}
            item={item}
            onItemClick={() => onItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
}

type UploadContentItemProps = {
  item: Post;
  onItemClick: () => void;
};

function UploadContentItem({ item, onItemClick }: UploadContentItemProps) {
  return (
    <div className={uploadContentItem} onClick={onItemClick}>
      <Text
        className={uploadContentSummary}
        fontSize={18}
        fontWeight="semibold"
        color="grey500"
      >
        {item.summary}
      </Text>
      <Text fontSize={16} fontWeight="medium" color="grey300">
        {getFormattedDatetime(item.uploadTime)}
      </Text>
    </div>
  );
}
