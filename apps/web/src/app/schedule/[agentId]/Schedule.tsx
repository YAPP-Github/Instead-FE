'use client';

import { SchedulePageProps } from './type';
import { getAgentUploadReservedQueryOptions } from '@web/store/query/useGetAgentUploadReserved';
import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import * as style from './pageStyle.css';
import {
  NavBar,
  MainBreadcrumbItem,
  AccountSidebar,
  DndController,
  UserProfileDropdown,
} from '@web/components/common';
import { Breadcrumb } from '@repo/ui';
import { useScroll } from '@web/hooks';
import { ROUTES } from '@web/routes';
import { Agent, POST_STATUS } from '@web/types';
import { useRouter } from 'next/navigation';
import { TitleWithDescription } from '@web/components/common/TitleWithDescription/TitleWithDescription';
import { ScheduleTable } from '@web/components/schedule/ScheduleTable/ScheduleTable';
import { ContentItem } from '@web/components/common/DNDController/compounds';
import { FormProvider, useForm } from 'react-hook-form';
import { getCurrentDateKo } from '@web/app/(prompt)/edit/[agentId]/[postGroupId]/schedule/utils/getCurrentDateKo';
import { useEffect } from 'react';
import { parseTime } from '@web/utils';
import { useUpdateReservedPostsMutation } from '@web/store/mutation/useUpdateReservedPostsMutation';

export default function Schedule({ params }: SchedulePageProps) {
  const [{ data: reservedPosts }] = useSuspenseQueries({
    queries: [getAgentUploadReservedQueryOptions({ agentId: params.agentId })],
  });

  const { mutate: updateReservedPosts } = useUpdateReservedPostsMutation(
    params.agentId
  );
  const queryClient = useQueryClient();

  const router = useRouter();
  const [scrollRef, isScrolled] = useScroll<HTMLFormElement>({
    threshold: 100,
  });

  const handleAccountClick = (id: Agent['id']) => {
    queryClient.clear();
    router.push(ROUTES.HOME.DETAIL(id));
  };

  const methods = useForm({
    defaultValues: {
      schedules: reservedPosts.posts.map((post) => {
        const parsedTime = parseTime(post.uploadTime);
        return {
          postId: post.id,
          date: parsedTime?.date ?? getCurrentDateKo(),
          hour: parsedTime?.hour ?? '00',
          minute: parsedTime?.minute ?? '00',
        };
      }),
    },
  });

  useEffect(() => {
    const subscription = methods.watch((formData) => {
      if (!formData.schedules) return;

      const updatePayload = {
        posts: formData.schedules.map((schedule, index) => ({
          postId: reservedPosts.posts[index]?.id,
          postGroupId: reservedPosts.posts[index]?.postGroupId,
          uploadTime: `${schedule?.date}T${schedule?.hour}:${schedule?.minute}:00.000Z`,
        })),
      };
      updateReservedPosts(updatePayload);
    });

    return () => subscription.unsubscribe();
  }, [methods, reservedPosts.posts, updateReservedPosts]);

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
          <div className={style.dndSectionStyle}>
            <TitleWithDescription
              title="업로드 예약 일정"
              rightTitle={reservedPosts.posts.length.toString()}
              description="개별 글의 업로드 날짜와 순서를 변경할 수 있어요"
            />
            <DndController
              initialItems={{
                [POST_STATUS.GENERATED]: [],
                [POST_STATUS.EDITING]: [],
                [POST_STATUS.READY_TO_UPLOAD]: [],
                [POST_STATUS.UPLOAD_RESERVED]: reservedPosts.posts,
                [POST_STATUS.UPLOAD_CONFIRMED]: [],
                [POST_STATUS.UPLOADED]: [],
                [POST_STATUS.UPLOAD_FAILED]: [],
              }}
              key={reservedPosts.posts
                .map((item) => `${item.id}-${item.displayOrder}-${item.status}`)
                .join(',')}
              onDragEnd={(updatedItems) => {
                const formValues = methods.getValues('schedules');
                const updatePayload = {
                  posts: updatedItems[POST_STATUS.UPLOAD_RESERVED].map(
                    (item, index) => ({
                      postId: item.id,
                      postGroupId: item.postGroupId,
                      uploadTime: `${formValues?.[index]?.date ?? ''}T${formValues?.[index]?.hour ?? '00'}:${formValues?.[index]?.minute ?? '00'}:00.000Z`,
                    })
                  ),
                };
                updateReservedPosts(updatePayload);
              }}
              renderDragOverlay={(activeItem) => (
                <ContentItem {...activeItem} />
              )}
            >
              <ScheduleTable
                agentId={params.agentId}
                postStatus={POST_STATUS.UPLOAD_RESERVED}
              />
            </DndController>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
