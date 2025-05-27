import { Skeleton } from '@repo/ui';
import * as style from './AccountSidebar.css';

export function AccountSidebarSkeleton() {
  return (
    <div className={style.skeletonListWrapperStyle}>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </div>
  );
}

function SkeletonItem() {
  return (
    <div className={style.skeletonWrapperStyle}>
      <Skeleton width="6rem" height="6rem" radius={4} />
      <div className={style.skeletonTitleWrapperStyle}>
        <Skeleton width="14rem" height="2rem" radius={4} />
        <Skeleton width="10rem" height="1.4rem" radius={4} />
      </div>
    </div>
  );
}
