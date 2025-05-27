import { Skeleton } from '@repo/ui';
import * as style from './style.css';

const SKELETON_COUNT = 15;

export function NewsCategorySectionSkeleton() {
  return (
    <div className={style.skeletonWrapperStyle}>
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <Skeleton key={index} width="6rem" height="4rem" radius={24} />
      ))}
    </div>
  );
}
