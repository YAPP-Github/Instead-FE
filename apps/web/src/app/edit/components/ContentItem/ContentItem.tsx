import { getMinutesAgo } from '../../utils';
import {
  contentItemStyle,
  cursorGrabStyle,
  cursorPointerStyle,
  iconHoverStyle,
  noShrinkStyle,
  timeStyle,
  titleStyle,
} from './ContentItem.css';
import { Icon } from '@repo/ui/Icon';
import { Text } from '@repo/ui/Text';
import Image from 'next/image';

export type ContentItemProps = {
  image?: string;
  title?: string;
  updatedAt: string;
  onRemove: () => void;
  onModify: () => void;
  onDrag: () => void;
};

export function ContentItem({ image, title, updatedAt }: ContentItemProps) {
  return (
    <div className={contentItemStyle}>
      {image ? (
        <div>x</div>
      ) : (
        <Icon
          className={noShrinkStyle}
          name="note"
          color="grey300"
          type="stroke"
          size="3.2rem"
        />
      )}
      <Text
        className={titleStyle}
        fontSize={18}
        fontWeight="semibold"
        color="grey600"
      >
        {title}
      </Text>
      <Text
        className={`${noShrinkStyle} ${timeStyle}`}
        fontSize={14}
        fontWeight="medium"
        color="grey400"
      >
        {`${getMinutesAgo(updatedAt)}분 전`}
      </Text>
      <div className={iconHoverStyle}>
        <Icon
          className={`${noShrinkStyle} ${cursorPointerStyle}`}
          name="trash"
          color="grey400"
          size="2.4rem"
        />
        <Icon
          className={`${noShrinkStyle} ${cursorPointerStyle}`}
          name="pencil"
          color="grey400"
          size="2.4rem"
        />
        <Icon
          className={`${noShrinkStyle} ${cursorGrabStyle}`}
          name="sixDots"
          color="grey400"
          size="2.4rem"
        />
      </div>
    </div>
  );
}
