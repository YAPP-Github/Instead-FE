import { Text } from '@repo/ui/Text';
import {
  card,
  cardText,
  content,
  emptyImage,
  leftText,
  uploadContentItem,
  uploadContentSummary,
} from './UploadContentCard.css';
import { Button } from '@repo/ui/Button';
import { Post } from '@web/types';
import { getFormattedDatetime } from '@web/utils';
import uploadEmptyImage from '@web/assets/images/uploadEmptyImage.png';
import Image from 'next/image';
import { Spacing } from '@repo/ui/Spacing';
import { isNotNil } from '@repo/ui/utils';

export type UploadContentCardProps = {
  text: string;
  onMoreButtonClick?: () => void;
  items?: Post[];
  onItemClick?: (post: Post) => void;
  itemLength?: number;
};

export function UploadContentCard({
  text,
  onMoreButtonClick,
  items,
  onItemClick,
  itemLength,
}: UploadContentCardProps) {
  return (
    <div className={card}>
      <div className={cardText}>
        <div className={leftText}>
          <Text fontSize={22} fontWeight="semibold" color="grey800">
            {text}
          </Text>
          <Text fontSize={22} fontWeight="medium" color="primary700">
            {itemLength ?? 0}
          </Text>
        </div>
        {isNotNil(items) && (
          <Button onClick={onMoreButtonClick} variant="text" size="small">
            더보기
          </Button>
        )}
      </div>
      <div>
        {isNotNil(items) && items.length > 0 ? (
          items.map((item) => (
            <UploadContentItem
              key={item.id}
              item={item}
              onItemClick={() => onItemClick && onItemClick(item)}
            />
          ))
        ) : (
          <div className={content}>
            <Image
              src={uploadEmptyImage}
              alt="empty image"
              className={emptyImage}
            />
            <Spacing size={24} />
            <Text color="grey600" fontWeight="bold" fontSize={22}>
              아직 업로드 예정된 글이 없어요
            </Text>
            <Text color="grey400" fontWeight="medium" fontSize={16}>
              글을 생성하고 업로드를 예약해보세요
            </Text>
          </div>
        )}
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
