'use client';

import { useScroll } from '@web/hooks';
import * as style from './pageStyle.css';
import { NavBar, MainBreadcrumbItem } from '@web/components/common';
import { Breadcrumb, Button, FixedBottomCTA, Icon } from '@repo/ui';
import { POST_STATUS } from '@web/types/post';
import { DndController } from '@web/components/common';
import { EditPageProps } from './types';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';
import { useUpdatePostsMutation } from '@web/store/mutation/useUpdatePostsMutation';
import { useRouter } from 'next/navigation';
import { EditContent } from './_components/EditContent/EditContent';
import { ContentItem } from '@web/components/common/DNDController/compounds';
import { ROUTES } from '@web/routes';

export default function Edit({ params }: EditPageProps) {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({ threshold: 100 });
  const { data: posts } = useGetAllPostsQuery({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
  });
  const { mutate: updatePosts } = useUpdatePostsMutation({
    agentId: params.agentId,
    postGroupId: params.postGroupId,
  });
  const router = useRouter();

  const hasReadyToUploadPosts =
    posts.data.posts[POST_STATUS.READY_TO_UPLOAD].length > 0;

  return (
    <>
      <div className={style.mainStyle} ref={scrollRef}>
        <NavBar
          leftAddon={
            <Breadcrumb>
              <MainBreadcrumbItem href={ROUTES.HOME.DETAIL(params.agentId)} />
              <Breadcrumb.Item active className={style.breadcrumbItemStyle}>
                {posts.data.postGroup.topic}
              </Breadcrumb.Item>
            </Breadcrumb>
          }
          isScrolled={isScrolled}
        />

        <DndController
          initialItems={posts.data.posts}
          key={Object.values(posts.data.posts)
            .flat()
            .map((item) => `${item.id}-${item.displayOrder}-${item.status}`)
            .join(',')}
          onDragEnd={(updatedItems) => {
            const updatePayload = {
              posts: Object.values(updatedItems)
                .flat()
                .map((item) => ({
                  postId: item.id,
                  status: item.status,
                  displayOrder: item.displayOrder,
                  uploadTime: item.uploadTime,
                })),
            };
            updatePosts(updatePayload);
          }}
          renderDragOverlay={(activeItem) => (
            <ContentItem
              summary={activeItem.summary}
              updatedAt={activeItem.updatedAt}
            />
          )}
        >
          <EditContent params={params} />
        </DndController>
      </div>
      <FixedBottomCTA
        type="submit"
        leftAddon={<Icon name="checkCalendar" size={20} />}
        onClick={() =>
          router.push(
            ROUTES.EDIT.SCHEDULE({
              agentId: params.agentId,
              postGroupId: params.postGroupId,
            })
          )
        }
        disabled={!hasReadyToUploadPosts}
      >
        예약하러 가기
      </FixedBottomCTA>
    </>
  );
}
