'use client';

import { SchedulePageProps } from './type';
import { useGetAgentUploadReservedQuery } from '@web/store/query/useGetAgentUploadReserved';
import { useGetAgentQuery } from '@web/store/query/useGetAgentQuery';
import { useGetUserQuery } from '@web/store/query/useGetUserQuery';
import { useQueryClient } from '@tanstack/react-query';
import * as style from './pageStyle.css';
import {
  NavBar,
  MainBreadcrumbItem,
  AccountSidebar,
  DndController,
} from '@web/components/common';
import { Breadcrumb, Dropdown, Icon, Text, Modal } from '@repo/ui';
import Image from 'next/image';
import { useScroll } from '@web/hooks';
import { ROUTES } from '@web/routes';
import { isNil } from '@repo/ui/utils';
import { useLogoutMutation } from '@web/store/mutation/useLogoutMutation';
import { Agent, POST_STATUS } from '@web/types';
import { useRouter } from 'next/navigation';
import { useModal } from '@repo/ui/hooks';
import { TitleWithDescription } from '@web/components/common/TitleWithDescription/TitleWithDescription';
import { ScheduleTable } from '@web/components/schedule/ScheduleTable/ScheduleTable';
import { ContentItem } from '@web/components/common/DNDController/compounds';
import { FormProvider, useForm } from 'react-hook-form';
import { getCurrentDateKo } from '@web/app/(prompt)/edit/[agentId]/[postGroupId]/schedule/utils/getCurrentDateKo';
import { useEffect } from 'react';
import { parseTime } from '@web/utils';
import { useUpdateReservedPostsMutation } from '@web/store/mutation/useUpdateReservedPostsMutation';

export default function Schedule({ params }: SchedulePageProps) {
  const { data: agentData } = useGetAgentQuery();
  const { data: user } = useGetUserQuery();
  const { data: reservedPosts } = useGetAgentUploadReservedQuery({
    agentId: params.agentId,
  });
  const { mutate: updateReservedPosts } = useUpdateReservedPostsMutation(
    params.agentId
  );
  const { mutate: logout } = useLogoutMutation();
  const queryClient = useQueryClient();

  const router = useRouter();
  const modal = useModal();
  const [scrollRef, isScrolled] = useScroll<HTMLFormElement>({
    threshold: 100,
  });

  const handleAccountClick = (id: Agent['id']) => {
    queryClient.clear();
    router.push(ROUTES.HOME.DETAIL(id));
  };

  /*
queryClient.invalidateQueries(
        getAgentUploadReservedQueryOptions({ agentId })
      );

  */

  const handleLogoutClick = () => {
    modal.confirm({
      title: '정말 로그아웃 하시겠어요??',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '로그아웃',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: () => {
          logout();
        },
      },
    });
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
          rightAddon={
            <Dropdown>
              <Dropdown.Trigger>
                {isNil(user.data.user?.profileImage) ? (
                  <div className={style.image} />
                ) : (
                  <Image
                    className={style.image}
                    width={40}
                    height={40}
                    src={user.data.user.profileImage}
                    alt="유저 프로필 이미지"
                  />
                )}
              </Dropdown.Trigger>
              <Dropdown.Content align="right">
                <Dropdown.Item
                  onClick={handleLogoutClick}
                  value="option1"
                  className={style.dropdownItem}
                >
                  <Icon name="logout" size="2.4rem" color="grey400" />
                  <Text.P fontSize={18} fontWeight="medium" color="grey1000">
                    로그아웃
                  </Text.P>
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          }
          isScrolled={isScrolled}
        />
        <AccountSidebar
          agentData={agentData.agents}
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
