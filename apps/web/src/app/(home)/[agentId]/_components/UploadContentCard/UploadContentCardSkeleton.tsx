import { Button, Skeleton, Text } from '@repo/ui';
import * as style from './UploadContentCard.css';
import { useRouter } from 'next/navigation';
import { IdParams } from '@web/types';
import { ROUTES } from '@web/routes';

type UploadContentCardSkeletonProps = {
  agentId: IdParams['agentId'];
};

export function UploadContentCardSkeleton({
  agentId,
}: UploadContentCardSkeletonProps) {
  const router = useRouter();

  return (
    <div className={style.card}>
      <div className={style.cardText}>
        <div className={style.leftText}>
          <Text fontSize={22} fontWeight="semibold" color="grey800">
            업로드 예약 일정
          </Text>
          <Skeleton width="2.8rem" height="2.2rem" radius={4} />
        </div>
        <Button
          onClick={() => router.push(ROUTES.SCHEDULE.ROOT(agentId))}
          variant="text"
          size="small"
        >
          더보기
        </Button>
      </div>
      <div className={style.skeletonContentWrapper}>
        <Skeleton width="100%" height="3.2rem" radius={4} />
        <Skeleton width="100%" height="3.2rem" radius={4} />
        <Skeleton width="100%" height="3.2rem" radius={4} />
        <Skeleton width="100%" height="3.2rem" radius={4} />
        <Skeleton width="100%" height="3.2rem" radius={4} />
      </div>
    </div>
  );
}
