import Image from 'next/image';
import {
  agentPlanBadge,
  emptyImage,
  image,
  textWrapper,
  wrapper,
} from './AccountItem.css';
import DNDImage from '@web/assets/images/dndImage.webp';
import { AgentPlan } from '@web/types/agent';
import { Text } from '@repo/ui/Text';
import { Icon } from '@repo/ui/Icon';
import { ColorsType } from '@repo/theme';
import { isNil } from '@repo/ui/utils';

export type AccountItemProps = {
  accountId: string;
  profileImageUrl?: string;
  agentPlan: AgentPlan;
  isSelected?: boolean;
  onClick?: () => void;
};

export function AccountItem({
  accountId,
  profileImageUrl,
  agentPlan,
  isSelected = false,
  onClick,
}: AccountItemProps) {
  return (
    <div className={wrapper} onClick={onClick}>
      {isNil(profileImageUrl) ? (
        <div className={emptyImage} />
      ) : (
        <Image
          className={image}
          width={60}
          height={60}
          src={DNDImage}
          alt={''}
        />
      )}
      <div className={textWrapper}>
        <Text
          fontSize={20}
          fontWeight={isSelected ? 'semibold' : 'medium'}
          color={isSelected ? 'primary700' : 'grey800'}
        >
          {accountId}
        </Text>
        <AgentPlanBadge agentPlan={agentPlan} />
      </div>
    </div>
  );
}

function AgentPlanBadge({ agentPlan }: { agentPlan: AgentPlan }) {
  const color: Record<AgentPlan, keyof ColorsType> = {
    BASIC: 'grey300',
    PREMIUM: 'primary600',
  };

  const plan: Record<AgentPlan, string> = {
    BASIC: '무료',
    PREMIUM: '프리미엄 플러스',
  };
  return (
    <div className={agentPlanBadge}>
      <Icon name="circle" color={color[agentPlan]} size="0.6rem" />
      <Text fontSize={14} fontWeight="semibold" color="grey400">
        {plan[agentPlan]}
      </Text>
    </div>
  );
}
