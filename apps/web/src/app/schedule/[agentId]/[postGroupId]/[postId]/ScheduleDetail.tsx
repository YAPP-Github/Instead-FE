'use client';

import * as style from './pageStyle.css';
import { useScroll } from '@web/hooks';
import { useRouter } from 'next/navigation';
import { MainBreadcrumbItem, NavBar } from '@web/components/common';
import { Breadcrumb, Dropdown, Icon, IconButton, Modal, Text } from '@repo/ui';
import { ScheduleDetailPageProps } from './type';
import { ROUTES } from '@web/routes';
import { useDeletePostMutation } from '@web/store/mutation/useDeletePostMutation';
import { useModal } from '@repo/ui/hooks';
import { Suspense } from 'react';
import { BreadcrumbItemContentSkelton } from './_components/BreadcrumbContent/BreadcrumbItemContentSkelton';
import { BreadcrumbItemContent } from './_components/BreadcrumbContent/BreadcrumbContent';
import {
  ScheduleDetailContent,
  ScheduleDetailContentSkeleton,
} from './_components/ScheduleDetailContent';

export default function ScheduleDetail({ params }: ScheduleDetailPageProps) {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({ threshold: 100 });
  const modal = useModal();
  const router = useRouter();

  const { mutate: deletePost } = useDeletePostMutation({
    agentId: Number(params.agentId),
    postGroupId: Number(params.postGroupId),
  });

  const handleDeletePost = () => {
    modal.confirm({
      title: '정말 삭제하시겠어요?',
      description: '삭제된 글은 복구할 수 없어요',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '삭제하기',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: async () => {
          deletePost(Number(params.postId), {
            onSuccess: () => router.back(),
          });
        },
      },
    });
  };

  return (
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
        rightAddon={
          <div className={style.buttonWrapperStyle}>
            <Dropdown>
              <Dropdown.Trigger>
                <IconButton icon="dots" />
              </Dropdown.Trigger>
              <Dropdown.Content align="right">
                <Dropdown.Item
                  value="option1"
                  className={style.dropdownItem}
                  onClick={handleDeletePost}
                >
                  <Icon name="trash" size="2.4rem" color="grey400" />
                  <Text fontSize={18} fontWeight="medium" color="grey1000">
                    삭제하기
                  </Text>
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
            <IconButton
              icon="x"
              iconType="stroke"
              onClick={() => router.back()}
            />
          </div>
        }
        isScrolled={isScrolled}
      />
      <div className={style.contentWrapperStyle}>
        <Suspense fallback={<ScheduleDetailContentSkeleton />}>
          <ScheduleDetailContent params={params} />
        </Suspense>
      </div>
    </div>
  );
}
