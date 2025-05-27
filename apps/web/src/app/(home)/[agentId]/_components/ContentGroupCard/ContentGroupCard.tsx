import { Text } from '@repo/ui/Text';
import {
  card,
  content,
  contentGroupImage,
  contentGroupItem,
  contentGroupText,
  contentGroupTopic,
  dropdownItem,
  dropdownWrapper,
  emptyContent,
  emptyImage,
  items,
  leftText,
} from './ContentGroupCard.css';
import { POST_PURPOSE, PostGroup } from '@web/types/post';
import Image from 'next/image';
import { getFormattedYearMonthDayHour } from '@web/utils/getFormattedYearMonthDayHour';
import { motion } from 'motion/react';
import { Dropdown } from '@repo/ui/Dropdown';
import { Icon } from '@repo/ui/Icon';
import { IconButton } from '@repo/ui/IconButton';
import { PostGroupId } from '@web/types';
import postGroupEmptyImage from '@web/assets/images/postGroupEmptyImage.png';
import { Spacing } from '@repo/ui/Spacing';
import { isNotNil } from '@repo/ui/utils';

export type ContentGroupCardProps = {
  postGroups?: PostGroup[];
  onItemClick?: (PostGroupId: PostGroupId) => void;
  onItemRemove?: (PostGroupId: PostGroupId) => void;
};

export function ContentGroupCard({
  postGroups,
  onItemClick,
  onItemRemove,
}: ContentGroupCardProps) {
  return (
    <div className={card}>
      <div className={leftText}>
        <Text fontSize={22} fontWeight="semibold" color="grey800">
          생성된 주제
        </Text>
        <Text fontSize={22} fontWeight="medium" color="primary700">
          {postGroups?.length || 0}
        </Text>
      </div>
      {isNotNil(postGroups) && postGroups.length > 0 ? (
        <div className={items}>
          {postGroups.map((item) => (
            <ContentGroupItem
              key={item.id}
              onItemClick={() => onItemClick && onItemClick(item.id)}
              onItemRemove={() => onItemRemove && onItemRemove(item.id)}
              item={item}
            />
          ))}
        </div>
      ) : (
        <div className={emptyContent}>
          <Spacing size={24} />
          <Image
            src={postGroupEmptyImage}
            alt="empty image"
            className={emptyImage}
          />
          <Spacing size={24} />
          <Text color="grey600" fontWeight="bold" fontSize={22}>
            아직 생성된 주제가 없어요
          </Text>
          <Text color="grey400" fontWeight="medium" fontSize={16}>
            자동으로 글을 만들어보세요
          </Text>
          <Spacing size={64} />
        </div>
      )}
    </div>
  );
}

export type ContentGroupItemProps = {
  item: PostGroup;
  onItemClick: () => void;
  onItemRemove: () => void;
};

export function ContentGroupItem({
  item,
  onItemClick,
  onItemRemove,
}: ContentGroupItemProps) {
  const imageVariants = {
    rest: { y: 0 },
    hover: { y: -8 },
  };

  return (
    <motion.div
      className={contentGroupItem}
      onClick={onItemClick}
      initial="rest"
      whileHover="hover"
    >
      <motion.div variants={imageVariants} transition={{ duration: 0.3 }}>
        <Image
          width={392}
          height={224}
          src={item.thumbnailImage}
          alt="content thumbnail"
          className={contentGroupImage}
        />
      </motion.div>
      <div className={content}>
        <div className={contentGroupText}>
          <Text fontSize={18} fontWeight="semibold" color="grey400">
            {POST_PURPOSE[item.purpose].label}
          </Text>
          <Text
            className={contentGroupTopic}
            fontSize={22}
            fontWeight="bold"
            color="grey600"
          >
            {item.topic}
          </Text>
          <Text fontSize={16} fontWeight="medium" color="grey400">
            {getFormattedYearMonthDayHour(item.createdAt)}
          </Text>
        </div>
        <div className={dropdownWrapper}>
          <Dropdown>
            <Dropdown.Trigger>
              <IconButton icon="dots" />
            </Dropdown.Trigger>
            <Dropdown.Content position="above" align="right">
              <Dropdown.Item
                value="option1"
                className={dropdownItem}
                onClick={(e) => {
                  e.stopPropagation();
                  onItemRemove();
                }}
              >
                <Icon name="trash" size="2.4rem" color="grey400" />
                <Text fontSize={18} fontWeight="medium" color="grey1000">
                  삭제하기
                </Text>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      </div>
    </motion.div>
  );
}
