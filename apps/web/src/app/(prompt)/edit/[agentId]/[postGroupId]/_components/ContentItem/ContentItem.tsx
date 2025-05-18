'use client';

import {
  ComponentPropsWithoutRef,
  forwardRef,
  MouseEvent,
  useEffect,
  useRef,
} from 'react';
import { getTimeAgo } from '@web/utils';
import {
  contentItemStyle,
  iconHoverStyle,
  noShrinkStyle,
  timeStyle,
  summaryStyle,
  backgroundVar,
  imageStyle,
} from './ContentItem.css';
import { Icon } from '@repo/ui/Icon';
import { IconButton } from '@repo/ui/IconButton';
import { Text } from '@repo/ui/Text';
import { Skeleton } from '@repo/ui/Skeleton';
import { mergeRefs } from '@repo/ui/utils';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { vars } from '@repo/theme';
import { PostImage } from '@web/types';
import Image from 'next/image';

export type ContentItemProps = {
  /**
   * 이미지 URL. 제공되지 않으면 기본 아이콘이 표시됩니다.
   */
  image?: PostImage;
  /**
   * 표시할 제목 텍스트.
   */
  summary?: string;
  /**
   * ISO 8601 형식의 날짜 문자열로, 마지막 업데이트 시간을 나타냅니다.
   */
  updatedAt: string;
  /**
   * 삭제 아이콘 클릭 시 호출되는 콜백 함수.
   */
  onRemove?: VoidFunction;
  /**
   * 수정 아이콘 클릭 시 호출되는 콜백 함수.
   */
  onModify?: VoidFunction;

  isLoading?: boolean;
  isSelected?: boolean;
} & Omit<ComponentPropsWithoutRef<'div'>, 'id'>;

/**
 * ContentItem 컴포넌트의 Props 타입
 *
 * @property {string} [image] - 이미지 URL. 제공되지 않으면 기본 아이콘이 표시됩니다.
 * @property {string} [summary] - 표시할 제목 텍스트.
 * @property {string} updatedAt - ISO 8601 형식의 날짜 문자열로, 마지막 업데이트 시간을 나타냅니다.
 * @property {VoidFunction} [onRemove] - 삭제 아이콘 클릭 시 호출되는 콜백 함수.
 * @property {VoidFunction} [onModify] - 수정 아이콘 클릭 시 호출되는 콜백 함수.
 */
export const ContentItem = forwardRef<HTMLDivElement, ContentItemProps>(
  (
    {
      image,
      summary,
      updatedAt,
      onRemove,
      onModify,
      className,
      isLoading,
      isSelected = false,
      ...props
    },
    ref
  ) => {
    const itemRef = useRef<HTMLDivElement>(null);

    const handleRemove = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onRemove?.();
    };

    const handleModify = (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onModify?.();
    };

    useEffect(() => {
      if (isSelected && itemRef.current) {
        itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, [isSelected]);
    return (
      <div
        ref={mergeRefs(ref, itemRef)}
        className={`${contentItemStyle} ${className ?? ''}`}
        style={{
          ...assignInlineVars({
            [backgroundVar]: isSelected ? vars.colors.greyA08 : 'transparent',
          }),
        }}
        {...props}
      >
        {image ? (
          <Image
            className={imageStyle}
            src={image.url}
            alt="post"
            width={32}
            height={32}
          />
        ) : (
          <Icon
            className={noShrinkStyle}
            name="note"
            color="grey300"
            type="stroke"
            size="3.2rem"
          />
        )}
        {isLoading ? (
          <Skeleton width="100%" height={'2.7rem'} radius={16} />
        ) : (
          <>
            <Text
              className={summaryStyle}
              fontSize={18}
              fontWeight={isSelected ? 'bold' : 'semibold'}
              color={isSelected ? 'grey900' : 'grey600'}
            >
              {summary}
            </Text>

            <Text
              className={`${noShrinkStyle} ${timeStyle}`}
              fontSize={14}
              fontWeight="medium"
              color="grey400"
            >
              {getTimeAgo(updatedAt)}
            </Text>
          </>
        )}
        {!isLoading && (
          <div className={iconHoverStyle}>
            {onRemove && <IconButton icon="trash" onClick={handleRemove} />}
            {onModify && <IconButton icon="pencil" onClick={handleModify} />}
            <IconButton icon="sixDots" />
          </div>
        )}
      </div>
    );
  }
);

ContentItem.displayName = 'ContentItem';
