'use client';

import { useScroll } from '@web/hooks';
import * as style from './pageStyle.css';
import {
  NavBar,
  MainBreadcrumbItem,
  BreadcrumbItemContentSkelton,
  BreadcrumbItemContent,
} from '@web/components/common';
import { Breadcrumb } from '@repo/ui';
import { EditPageProps } from './types';
import { ROUTES } from '@web/routes';
import { Suspense } from 'react';
import {
  EditContentWithDND,
  EditContentSkeleton,
} from './_components/EditContent';
import {
  SubmitBottomCTA,
  SubmitBottomCTASkeleton,
} from './schedule/_components/SubmitBottomCTA';

export default function Edit({ params }: EditPageProps) {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({ threshold: 100 });

  return (
    <>
      <div className={style.mainStyle} ref={scrollRef}>
        <NavBar
          leftAddon={
            <Breadcrumb>
              <MainBreadcrumbItem href={ROUTES.HOME.DETAIL(params.agentId)} />
              <Suspense fallback={<BreadcrumbItemContentSkelton />}>
                <BreadcrumbItemContent
                  agentId={params.agentId}
                  postGroupId={params.postGroupId}
                />
              </Suspense>
            </Breadcrumb>
          }
          isScrolled={isScrolled}
        />
        <Suspense fallback={<EditContentSkeleton />}>
          <EditContentWithDND
            agentId={params.agentId}
            postGroupId={params.postGroupId}
          />
        </Suspense>
      </div>
      <Suspense fallback={<SubmitBottomCTASkeleton />}>
        <SubmitBottomCTA
          agentId={params.agentId}
          postGroupId={params.postGroupId}
        >
          예약하러 가기
        </SubmitBottomCTA>
      </Suspense>
    </>
  );
}
