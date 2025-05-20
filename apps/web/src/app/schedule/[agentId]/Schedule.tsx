'use client';

import { ScheduleFormValues, SchedulePageProps } from './type';
import { useQueryClient } from '@tanstack/react-query';
import * as style from './pageStyle.css';
import {
  NavBar,
  MainBreadcrumbItem,
  AccountSidebar,
  UserProfileDropdown,
} from '@web/components/common';
import { Breadcrumb } from '@repo/ui';
import { useScroll } from '@web/hooks';
import { ROUTES } from '@web/routes';
import { Agent } from '@web/types';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { Suspense } from 'react';
import { ScheduleContent } from './_components/ScheduleContent/ScheduleContent';
import { ScheduleContentSkeleton } from './_components/ScheduleContent/ScheduleContentSkeleton';

export default function Schedule({ params }: SchedulePageProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [scrollRef, isScrolled] = useScroll<HTMLFormElement>({
    threshold: 100,
  });

  const methods = useForm<ScheduleFormValues>({
    defaultValues: {
      schedules: [],
    },
  });

  const handleAccountClick = (id: Agent['id']) => {
    queryClient.clear();
    router.push(ROUTES.HOME.DETAIL(id));
  };

  return (
    <FormProvider {...methods}>
      <form className={style.mainStyle} ref={scrollRef}>
        <NavBar
          leftAddon={
            <Breadcrumb>
              <Breadcrumb.Item>
                <MainBreadcrumbItem href={ROUTES.HOME.DETAIL(params.agentId)} />
              </Breadcrumb.Item>
            </Breadcrumb>
          }
          rightAddon={<UserProfileDropdown />}
          isScrolled={isScrolled}
        />
        <AccountSidebar
          selectedId={Number(params.agentId)}
          onAccountClick={handleAccountClick}
        />
        <div className={style.contentWrapperStyle}>
          <Suspense fallback={<ScheduleContentSkeleton />}>
            <ScheduleContent agentId={params.agentId} />
          </Suspense>
        </div>
      </form>
    </FormProvider>
  );
}
