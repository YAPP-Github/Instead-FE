import { Badge } from '@repo/ui/Badge';
import { promptText, wrapper } from './LogContentItem.css';
import { Text } from '@repo/ui/Text';
import { getTimeAgo } from '@web/utils';

export type LogContentItemProps = {
  type: 'EACH' | 'ALL';
  createdAt: Date | string;
  id: number;
  prompt: string;
  response: string;
};
type BadgeInfo = {
  color: 'pink' | 'blue';
  text: string;
};

const BadgeVariants: Record<LogContentItemProps['type'], BadgeInfo> = {
  ALL: {
    color: 'pink',
    text: '개별 적용',
  },
  EACH: {
    color: 'blue',
    text: '일괄 적용',
  },
};
export function LogContentItem({
  type,
  createdAt,
  id,
  prompt,
  response,
}: LogContentItemProps) {
  const { color, text } = BadgeVariants[type];
  return (
    <div className={wrapper}>
      <Badge size="medium" variant={color} shape="square">
        {text}
      </Badge>
      <Text
        className={promptText}
        color="grey800"
        fontSize={16}
        fontWeight="medium"
      >
        {prompt}
      </Text>
      <Text color="grey300" fontSize={14} fontWeight="medium">
        {/* TODO 디자인 시안과 동일하게 */}
        {getTimeAgo(createdAt)}
      </Text>
    </div>
  );
}
