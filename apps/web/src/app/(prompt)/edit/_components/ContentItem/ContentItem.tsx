import { getTimeAgo } from '../../_utils';
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
import { IconButton } from '@repo/ui/IconButton';
import { Text } from '@repo/ui/Text';

export type ContentItemProps = {
  image?: string;
  title?: string;
  updatedAt: string;
  onRemove: () => void;
  onModify: () => void;
  onDrag: () => void;
};

/**
 * ContentItem 컴포넌트의 Props 타입
 *
 * @property {string} [image] - 이미지 URL. 제공되지 않으면 기본 아이콘이 표시됩니다.
 * @property {string} [title] - 표시할 제목 텍스트.
 * @property {string} updatedAt - ISO 8601 형식의 날짜 문자열로, 마지막 업데이트 시간을 나타냅니다.
 * @property {() => void} onRemove - 삭제 아이콘 클릭 시 호출되는 콜백 함수.
 * @property {() => void} onModify - 수정 아이콘 클릭 시 호출되는 콜백 함수.
 * @property {() => void} onDrag - 드래그 아이콘 마우스 다운 시 호출되는 콜백 함수.
 */
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
        {`${getTimeAgo(updatedAt)}`}
      </Text>
      <div className={iconHoverStyle}>
        <IconButton icon="trash" />
        <IconButton icon="pencil" />
        <IconButton className={cursorGrabStyle} icon="sixDots" />
      </div>
    </div>
  );
}
