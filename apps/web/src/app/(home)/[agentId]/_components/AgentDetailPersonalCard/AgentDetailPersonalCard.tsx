import { PersonalCard, PersonalCardProps } from '../PersonalCard/PersonalCard';
import { useGetAgentDetailQuery } from '@web/store/query/useGetAgentDetailQuery';
import { IdParams } from '@web/types';

type AgentDetailPersonalCardProps = Omit<PersonalCardProps, 'data'> & {
  agentId: IdParams['agentId'];
};

export function AgentDetailPersonalCard({
  onIconClick,
  agentId,
}: AgentDetailPersonalCardProps) {
  const { data: agentDetail } = useGetAgentDetailQuery({
    agentId: Number(agentId),
  });

  return (
    <PersonalCard
      data={agentDetail.agentPersonalSetting}
      onIconClick={onIconClick}
    />
  );
}
