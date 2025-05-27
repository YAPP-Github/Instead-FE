import { Skeleton, Spacing } from '@repo/ui';
import * as style from './style.css';

const SKELETON_COUNT = 4;

export function ScheduleDetailContentSkeleton() {
  return (
    <>
      <Spacing size={16} />
      <Skeleton width="40rem" height="4.8rem" radius={4} />
      <Spacing size={16} />
      <Skeleton width="73.6rem" height="30rem" radius={4} />
      <Spacing size={12} />
      <div className={style.imageWrapperStyle}>
        {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
          <Skeleton key={index} width="18.55rem" height="24rem" radius={4} />
        ))}
      </div>
    </>
  );
}
