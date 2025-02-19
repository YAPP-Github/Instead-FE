import Image from 'next/image';
import {
  agentPlanBadge,
  emptyImage,
  image,
  textWrapper,
  wrapper,
} from './AccountItem.css';
import { Text } from '@repo/ui/Text';
import { Icon } from '@repo/ui/Icon';
import { vars } from '@repo/theme';
import { isNil } from '@repo/ui/utils';
import { AgentPlan } from '@web/types';

export type AccountItemProps = {
  accountName: string;
  profileImageUrl?: string;
  agentPlan: AgentPlan | string;
  isSelected?: boolean;
  onClick?: () => void;
};

export function AccountItem({
  accountName,
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
          src={profileImageUrl}
          alt={''}
        />
      )}
      <div className={textWrapper}>
        <Text
          fontSize={20}
          fontWeight={isSelected ? 'semibold' : 'medium'}
          color={isSelected ? 'primary700' : 'grey800'}
        >
          {accountName}
        </Text>
        <AgentPlanBadge agentPlan={agentPlan} />
      </div>
    </div>
  );
}

interface AgentPlanBadgeProps {
  agentPlan?: AgentPlan | string;
}

function AgentPlanBadge({ agentPlan }: AgentPlanBadgeProps) {
  const colors: Record<AgentPlan, keyof typeof vars.colors> = {
    FREE: 'grey300',
    BASIC: 'grey300',
    PREMIUM: 'primary600',
    PREMIUM_PLUS: 'primary600',
  };

  const plans: Record<AgentPlan, string> = {
    FREE: '무료',
    BASIC: '베이직',
    PREMIUM: '프리미엄',
    PREMIUM_PLUS: '프리미엄 플러스',
  };

  let displayColor: keyof typeof vars.colors;
  let displayText: string;

  if (!agentPlan || agentPlan === '') {
    displayColor = 'grey300';
    displayText = '아직 연동되지 않았어요';
  } else if (Object.keys(plans).includes(agentPlan)) {
    displayColor = colors[agentPlan as AgentPlan];
    displayText = plans[agentPlan as AgentPlan];
  } else {
    displayColor = 'grey300';
    displayText = '아직 연동되지 않았어요';
  }

  return (
    <div className={agentPlanBadge}>
      <Icon name="circle" color={displayColor} size="0.6rem" />
      <Text fontSize={14} fontWeight="semibold" color="grey400">
        {displayText}
      </Text>
    </div>
  );
}
