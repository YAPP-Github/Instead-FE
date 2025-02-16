import { Text } from '@repo/ui/Text';
import {
  card,
  content,
  contentGroupImage,
  contentGroupItem,
  contentGroupText,
  dropdownItem,
  dropdownWrapper,
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

export type ContentGroupCardProps = {
  text: string;
  postGroups: PostGroup[];
  onItemClick: (id: number) => void;
  onItemRemove: (id: number) => void;
};

export function ContentGroupCard({
  text,
  postGroups,
  onItemClick,
  onItemRemove,
}: ContentGroupCardProps) {
  return (
    <div className={card}>
      <div className={leftText}>
        <Text fontSize={22} fontWeight="semibold" color="grey800">
          {text}
        </Text>
        <Text fontSize={22} fontWeight="medium" color="primary700">
          {postGroups?.length || 0}
        </Text>
      </div>
      <div className={items}>
        {postGroups.map((item) => (
          <ContentGroupItem
            key={item.id}
            onItemClick={() => onItemClick(item.id)}
            onItemRemove={() => onItemRemove(item.id)}
            item={item}
          />
        ))}
      </div>
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
          <Text fontSize={22} fontWeight="bold" color="grey600">
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
            <Dropdown.Content align="right">
              <Dropdown.Item
                value="option1"
                className={dropdownItem}
                onClick={onItemRemove}
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
