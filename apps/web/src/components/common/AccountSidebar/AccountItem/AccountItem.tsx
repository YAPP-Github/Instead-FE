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
import { Agent, AGENT_PLAN, AGENT_PLATFORM, AgentPlan } from '@web/types';

export type AccountItemProps = {
  accountName?: string;
  profileImageUrl?: string;
  agentPlan?: Agent['agentPlan'];
  agentPlatform?: Agent['platform'];
  isSelected?: boolean;
  onClick?: () => void;
};

export function AccountItem({
  accountName,
  profileImageUrl,
  agentPlan,
  agentPlatform,
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
          {accountName ?? '아직 연동되지 않았어요'}
        </Text>
        <AgentPlanBadge agentPlan={agentPlan} agentPlatform={agentPlatform} />
      </div>
    </div>
  );
}

interface AgentPlanBadgeProps {
  agentPlatform?: Agent['platform'];
  agentPlan?: Agent['agentPlan'];
}

function AgentPlanBadge({ agentPlan, agentPlatform }: AgentPlanBadgeProps) {
  const colors: Record<AgentPlan, keyof typeof vars.colors> = {
    FREE: 'grey300',
    BASIC: 'grey300',
    PREMIUM: 'primary600',
    PREMIUM_PLUS: 'primary600',
  };

  const displayText =
    agentPlan && agentPlatform
      ? `${AGENT_PLATFORM[agentPlatform]} / ${AGENT_PLAN[agentPlan]}`
      : '아직 연동되지 않았어요';
  const displayColor = agentPlan ? colors[agentPlan] : 'grey300';

  return (
    <div className={agentPlanBadge}>
      <Icon name="circle" color={displayColor} size="0.6rem" />
      <Text fontSize={14} fontWeight="semibold" color="grey400">
        {displayText}
      </Text>
    </div>
  );
}
