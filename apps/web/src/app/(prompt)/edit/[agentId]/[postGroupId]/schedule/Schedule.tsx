'use client';

import { useScroll } from '@web/hooks';
import * as style from './pageStyle.css';
import { NavBar, MainBreadcrumbItem } from '@web/components/common';
import { Breadcrumb, Button, Icon, Label } from '@repo/ui';
import { DndController } from '@web/components/common';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { useUpdatePostsMutation } from '@web/store/mutation/useUpdatePostsMutation';
import { SideBar } from './_components/SideBar/SideBar';
import { TitleWithDescription } from './_components/TitleWithDescription/TitleWithDescription';
import { useRouter } from 'next/navigation';
import { ScheduleTable } from './_components/ScheduleTable/ScheduleTable';
import { TableRow } from './_components/TableRow/TableRow';
import { Column } from './_components/ScheduleTable/types';
import { EditPageProps } from '../types';
import { ROUTES } from '@web/routes';
import { POST_STATUS } from '@web/types';

export default function Schedule({ params }: EditPageProps) {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({ threshold: 100 });
  const { data: posts } = useGetAllPostsQuery(params);
  const { mutate: updatePosts } = useUpdatePostsMutation(params);
  const router = useRouter();

  const columns: Column[] = [
    {
      id: 'date',
      label: '날짜 변경',
      width: '16.6rem',
    },
    {
      id: 'time',
      label: '시 단위',
      width: '10.5rem',
    },
    {
      id: 'summary',
      label: '분 단위',
      width: '16.5rem',
    },
    {
      id: 'action',
      label: '순서 변경',
      width: '53.2rem',
    },
  ];

  return (
    <div className={style.mainStyle} ref={scrollRef}>
      <NavBar
        leftAddon={
          <Breadcrumb>
            <MainBreadcrumbItem href="/" />
            <Breadcrumb.Item active>기초 경제 지식</Breadcrumb.Item>
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
            <Button
              type="submit"
              size="large"
              variant="primary"
              leftAddon={<Icon name="check" size={20} />}
              onClick={() => {}}
              className={style.submitButtonStyle}
            >
              예약 완료
            </Button>
          </div>
        }
        isScrolled={isScrolled}
      />
      <SideBar>
        {/* TODO: 드롭다운 컴포넌트 추가 */}
        <div className={style.sideBarContentWrapperStyle}>
          <TitleWithDescription
            title="전체 예약"
            description="많은 글의 업로드 시간을 한꺼번에 설정해요"
          />
          <div className={style.dropdownWrapperStyle}>
            <Label>하루에 몇 개씩 업로드할까요?</Label>
          </div>
          <div className={style.dropdownWrapperStyle}>
            <Label>언제 처음으로 업로드할까요?</Label>
          </div>
          <div className={style.dropdownWrapperStyle}>
            <Label>업로드를 원하는 시간대를 선택하세요</Label>
          </div>
        </div>
      </SideBar>
      <div className={style.contentWrapperStyle}>
        <div className={style.dndSectionStyle}>
          <TitleWithDescription
            title="업로드 예약 일정"
            description="개별 글의 업로드 날짜와 순서를 변경할 수 있어요"
          />
          <DndController
            initialItems={posts.data.posts}
            key={Object.values(posts.data.posts)
              .flat()
              .map((item) => `${item.id}-${item.displayOrder}-${item.status}`)
              .join(',')}
            onDragEnd={(updatedItems) => {
              const updatePayload = {
                posts: updatedItems[POST_STATUS.READY_TO_UPLOAD].map(
                  (item) => ({
                    postId: item.id,
                    status: item.status,
                    displayOrder: item.displayOrder,
                    uploadTime: item.uploadTime,
                  })
                ),
              };
              updatePosts(updatePayload);
            }}
            renderDragOverlay={(activeItem) => (
              <TableRow columns={columns} {...activeItem} />
            )}
          >
            <ScheduleTable params={params} columns={columns} />
          </DndController>
        </div>
      </div>
    </div>
  );
}
