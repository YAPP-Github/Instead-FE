'use client';

import { useScroll } from '@web/hooks';
import * as style from './pageStyle.css';
import { NavBar, MainBreadcrumbItem } from '@web/components/common';
import { Breadcrumb, Button, FixedBottomCTA, Icon, Label } from '@repo/ui';
import { DndController } from '@web/components/common';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { useUpdatePostsMutation } from '@web/store/mutation/useUpdatePostsMutation';
import { SideBar } from './_components/SideBar/SideBar';
import { TitleWithDescription } from '@web/components/common/TitleWithDescription/TitleWithDescription';
import { useRouter } from 'next/navigation';
import { ScheduleTable } from '@web/components/schedule/ScheduleTable/ScheduleTable';
import { EditPageProps } from '../types';
import { ROUTES } from '@web/routes';
import { POST_STATUS } from '@web/types';
import { ContentItem } from '../_components/ContentItem/ContentItem';
import { useForm, FormProvider } from 'react-hook-form';
import { validateScheduleDate } from '@web/utils/validateScheduleDate';
import { useToast } from '@repo/ui/hooks';
import { isNotNil } from '@repo/ui/utils';
import { getCurrentDateKo } from './utils/getCurrentDateKo';
import { CountDropdown } from './_components/CountDropdown/CountDropdown';
import { StartDateDropdown } from './_components/StartDateDropdown/StartDateDropdown';
import { WhenDropdown } from './_components/WhenDropdown/WhenDropdown';

export default function Schedule({ params }: EditPageProps) {
  const [scrollRef, isScrolled] = useScroll<HTMLFormElement>({
    threshold: 100,
  });
  const { data: posts } = useGetAllPostsQuery(params);
  const { mutate: updatePosts } = useUpdatePostsMutation(params);
  const readyToUploadPosts = posts.data.posts.READY_TO_UPLOAD;
  const router = useRouter();
  const toast = useToast();

  const methods = useForm({
    defaultValues: {
      schedules: readyToUploadPosts.map((post) => ({
        postId: post.id,
        date: getCurrentDateKo(),
        hour: '00',
        minute: '00',
      })),
    },
  });

  const onSubmit = methods.handleSubmit((data) => {
    const isValidSchedules = data.schedules.every((schedule) => {
      if (
        isNotNil(schedule.date) &&
        isNotNil(schedule.hour) &&
        isNotNil(schedule.minute)
      ) {
        return validateScheduleDate(
          schedule.date,
          schedule.hour,
          schedule.minute
        );
      }
      return false;
    });

    if (!isValidSchedules) {
      toast.error('예약 시간은 현재 시간 이후로 설정해주세요.');
      return;
    }

    const updatePayload = {
      posts: readyToUploadPosts.map((post, index) => ({
        postId: post.id,
        status: POST_STATUS.UPLOAD_RESERVED,
        displayOrder: post.displayOrder,
        uploadTime: `${data.schedules[index]?.date}T${data.schedules[index]?.hour}:${data.schedules[index]?.minute}:00`, // TODO: 임시 구현. 추후 타입 가드 필요
      })),
    };

    updatePosts(updatePayload, {
      onSuccess: () => {
        toast.success('예약이 완료되었어요');
        router.push(ROUTES.HOME.DETAIL(params.agentId));
      },
    });
  });

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={onSubmit} className={style.mainStyle} ref={scrollRef}>
          <NavBar
            leftAddon={
              <Breadcrumb>
                <MainBreadcrumbItem href={ROUTES.HOME.DETAIL(params.agentId)} />
                <Breadcrumb.Item active className={style.breadcrumbItemStyle}>
                  {posts.data.postGroup.topic}
                </Breadcrumb.Item>
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
          {/* <SideBar>
          <div className={style.sideBarContentWrapperStyle}>
            <TitleWithDescription
              title="전체 예약"
              description="많은 글의 업로드 시간을 한꺼번에 설정해요"
            />
            <div className={style.dropdownWrapperStyle}>
              <Label>하루에 몇 개씩 업로드할까요?</Label>
              <CountDropdown value="1" onChange={() => {}} />
            </div>
            <div className={style.dropdownWrapperStyle}>
              <Label>언제 처음으로 업로드할까요?</Label>
              <StartDateDropdown
                value={getCurrentDateKo()}
                onChange={() => {}}
              />
            </div>
            <div className={style.dropdownWrapperStyle}>
              <Label>업로드를 원하는 시간대를 선택하세요</Label>
              <WhenDropdown value="1" onChange={() => {}} />
            </div>
          </div>
        </SideBar> */}
          <div className={style.contentWrapperStyle}>
            <div className={style.dndSectionStyle}>
              <TitleWithDescription
                title="업로드 예약 일정"
                rightTitle={readyToUploadPosts.length.toString()}
                description="개별 글의 업로드 날짜와 순서를 변경할 수 있어요"
              />
              <DndController
                initialItems={posts.data.posts}
                key={Object.values(posts.data.posts)
                  .flat()
                  .map(
                    (item) => `${item.id}-${item.displayOrder}-${item.status}`
                  )
                  .join(',')}
                renderDragOverlay={(activeItem) => (
                  <ContentItem {...activeItem} />
                )}
              >
                <ScheduleTable
                  agentId={params.agentId}
                  postStatus={POST_STATUS.READY_TO_UPLOAD}
                />
              </DndController>
            </div>
          </div>
        </form>
      </FormProvider>
      <FixedBottomCTA type="submit" leftAddon={<Icon name="check" size={20} />}>
        예약 완료
      </FixedBottomCTA>
    </>
  );
}
