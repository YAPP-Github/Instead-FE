'use client';

import { useScroll } from '@web/hooks';
import * as style from './pageStyle.css';
import {
  NavBar,
  MainBreadcrumbItem,
  BreadcrumbItemContentSkelton,
} from '@web/components/common';
import { Breadcrumb, Button, FixedBottomCTA, Icon } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@web/routes';
import { useForm, FormProvider } from 'react-hook-form';
import { validateScheduleDate } from '@web/utils/validateScheduleDate';
import { useToast } from '@repo/ui/hooks';
import { isNotNil } from '@repo/ui/utils';
import { getFormattedHourByAMPM } from '@web/utils';
import { Suspense } from 'react';
import { ScheduleContent } from './_components/ScheduleContent/ScheduleContent';
import { ScheduleContentSkeleton } from './_components/ScheduleContent/ScheduleContentSkeleton';
import { useUpdatePostsMutation } from '@web/store/mutation/useUpdatePostsMutation';
import { POST_STATUS } from '@web/types';
import { EditPageProps, ScheduleFormValues } from '../types';
import { BreadcrumbItemContent } from '@web/components/common';

export default function Schedule({ params }: EditPageProps) {
  const [scrollRef, isScrolled] = useScroll<HTMLFormElement>({
    threshold: 100,
  });
  const router = useRouter();
  const toast = useToast();
  const { mutate: updatePosts } = useUpdatePostsMutation(params);

  const methods = useForm<ScheduleFormValues>({
    defaultValues: {
      schedules: [],
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    const isValidSchedules = data.schedules.every((schedule) => {
      if (
        isNotNil(schedule.date) &&
        isNotNil(schedule.hour) &&
        isNotNil(schedule.minute) &&
        isNotNil(schedule.amPm)
      ) {
        const formattedHour = getFormattedHourByAMPM(
          schedule.hour,
          schedule.amPm
        );
        return validateScheduleDate(
          schedule.date,
          formattedHour,
          schedule.minute
        );
      }
      return false;
    });

    if (!isValidSchedules) {
      toast.error('예약 시간은 현재 시간 이후로 설정해주세요.');
      return;
    }

    updatePosts(
      {
        posts: data.schedules.map((schedule) => ({
          postId: schedule.postId,
          status: POST_STATUS.UPLOAD_CONFIRMED,
          uploadTime: `${schedule.date}T${getFormattedHourByAMPM(
            schedule.hour,
            schedule.amPm
          )}:${schedule.minute}:00`,
        })),
      },
      {
        onSuccess: () => {
          toast.success('예약이 완료되었어요');
          router.push(ROUTES.HOME.DETAIL(params.agentId));
        },
      }
    );
  });

  return (
    <>
      <FormProvider {...methods}>
        <form
          id="schedule-form"
          onSubmit={onSubmit}
          className={style.mainStyle}
          ref={scrollRef}
        >
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
            rightAddon={
              <div className={style.buttonWrapperStyle}>
                <Button
                  type="button"
                  size="large"
                  variant="text"
                  onClick={() =>
                    router.push(
                      ROUTES.EDIT.ROOT({
                        agentId: Number(params.agentId),
                        postGroupId: Number(params.postGroupId),
                      })
                    )
                  }
                >
                  이전
                </Button>
              </div>
            }
            isScrolled={isScrolled}
          />
          <div className={style.contentWrapperStyle}>
            <Suspense fallback={<ScheduleContentSkeleton />}>
              <ScheduleContent
                agentId={params.agentId}
                postGroupId={params.postGroupId}
              />
            </Suspense>
          </div>
        </form>
      </FormProvider>
      <FixedBottomCTA
        type="submit"
        form="schedule-form"
        leftAddon={<Icon name="check" size={20} />}
      >
        예약 완료
      </FixedBottomCTA>
    </>
  );
}
