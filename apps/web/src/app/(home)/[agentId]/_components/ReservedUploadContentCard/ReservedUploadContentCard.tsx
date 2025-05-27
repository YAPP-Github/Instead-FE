import { IdParams } from '@web/types';
import { UploadContentCard } from '../UploadContentCard/UploadContentCard';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@web/routes';
import { useGetAgentUploadReservedQuery } from '@web/store/query/useGetAgentUploadReserved';

type ReservedUploadContentCardProps = {
  agentId: IdParams['agentId'];
};

export function ReservedUploadContentCard({
  agentId,
}: ReservedUploadContentCardProps) {
  const router = useRouter();
  const { data: agentUploadReserved } = useGetAgentUploadReservedQuery({
    agentId: Number(agentId),
  });

  const agentUploadReservedData = agentUploadReserved.posts.slice(0, 5);

  return (
    <UploadContentCard
      onMoreButtonClick={() => router.push(ROUTES.SCHEDULE.ROOT(agentId))}
      onItemClick={(post) => {
        router.push(
          ROUTES.SCHEDULE.DETAIL({
            agentId: agentId,
            postGroupId: post.postGroupId,
            postId: post.id,
          })
        );
      }}
      items={agentUploadReservedData}
      itemLength={agentUploadReserved.posts.length}
    />
  );
}
