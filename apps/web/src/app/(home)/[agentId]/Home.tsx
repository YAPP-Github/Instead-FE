'use client';

import {
  MainBreadcrumbItem,
  NavBar,
  UserProfileDropdown,
} from '@web/components/common';
import { AccountSidebar } from '../../../components/common/AccountSidebar/AccountSidebar';
import { useScroll } from '@web/hooks';
import { ROUTES } from '@web/routes';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import {
  animatedText,
  background,
  cardContent,
  content,
  cardColumn,
  cardRow,
  flexColumn,
} from './page.css';
import { GradientAnimatedText } from '@repo/ui/GradientAnimatedText';
import CreateImage from '@web/assets/images/createImage.webp';
import { CTACard } from './_components/CTACard/CTACard';
import { PersonalCard } from './_components/PersonalCard/PersonalCard';
import { UploadContentCard } from './_components/UploadContentCard/UploadContentCard';
import { ContentGroupCard } from './_components/ContentGroupCard/ContentGroupCard';
import { Spacing } from '@repo/ui/Spacing';
import { getAgentDetailQueryOptions } from '@web/store/query/useGetAgentDetailQuery';
import { getAgentPostGroupsQueryOptions } from '@web/store/query/useGetAgentPostGroupsQuery';
import { getAgentUploadReservedQueryOptions } from '@web/store/query/useGetAgentUploadReserved';
import { HomePageProps } from './types';
import { useRouter } from 'next/navigation';
import { Agent, PostGroupId } from '@web/types';
import { useModal } from '@repo/ui/hooks';
import { Modal } from '@repo/ui/Modal';
import { useDeletePostGroupMutation } from '@web/store/mutation/useDeletePostGroupMutation';
import { useSuspenseQueries } from '@tanstack/react-query';

export default function Home({ params }: HomePageProps) {
  const router = useRouter();
  const modal = useModal();
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });

  const [
    { data: agentDetail },
    { data: agentUploadReserved },
    { data: agentPostGroups },
  ] = useSuspenseQueries({
    queries: [
      getAgentDetailQueryOptions({ agentId: params.agentId }),
      getAgentUploadReservedQueryOptions({ agentId: params.agentId }),
      getAgentPostGroupsQueryOptions({ agentId: params.agentId }),
    ],
  });

  const { mutate: deletePostGroups } = useDeletePostGroupMutation({
    agentId: params.agentId,
  });

  const agentDetailData = agentDetail.agentPersonalSetting;
  const agentUploadReservedData = agentUploadReserved.posts.slice(0, 5);

  const handleDeletePostGroup = (postGroupId: PostGroupId) => {
    modal.confirm({
      title: '정말 삭제하시겠어요?',
      description: '삭제된 글은 복구할 수 없어요',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '삭제하기',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: () => {
          deletePostGroups(postGroupId);
        },
      },
    });
  };

  return (
    <div className={background} ref={scrollRef}>
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
      <div className={content}>
        <AccountSidebar
          selectedId={Number(params.agentId)}
          onAccountClick={(id: Agent['id']) =>
            router.push(ROUTES.HOME.DETAIL(id))
          }
        />
        <div className={cardContent}>
          <Spacing size={24} />
          <GradientAnimatedText className={animatedText}>
            한 번의 설정으로 끝없이 흘러가는 콘텐츠
          </GradientAnimatedText>

          <div className={cardColumn}>
            <div className={cardRow}>
              <div className={flexColumn}>
                {/* 주제 생성 카드 */}
                <CTACard
                  text={'자동으로 글을 만들어보세요'}
                  buttonText={'주제 생성하기'}
                  onButtonClick={() =>
                    router.push(ROUTES.CREATE(params.agentId))
                  }
                  imageSrc={CreateImage}
                />
                <Spacing size={16} />
                {/* 개인화 설정 카드 */}
                <PersonalCard
                  text={'개인화 설정'}
                  data={agentDetailData}
                  onIconClick={() =>
                    router.push(ROUTES.PERSONALIZE(params.agentId))
                  }
                />
              </div>

              {/* 업로드 예약 일정 카드 */}
              <UploadContentCard
                text={'업로드 예약 일정'}
                onMoreButtonClick={() =>
                  router.push(ROUTES.SCHEDULE.ROOT(params.agentId))
                }
                onItemClick={(post) => {
                  router.push(
                    ROUTES.SCHEDULE.DETAIL({
                      agentId: params.agentId,
                      postGroupId: post.postGroupId,
                      postId: post.id,
                    })
                  );
                }}
                items={agentUploadReservedData}
                itemLength={agentUploadReserved.posts.length}
              />
            </div>

            {/* 생성된 주제 카드 */}
            <ContentGroupCard
              text="생성된 주제"
              postGroups={agentPostGroups.postGroups}
              onItemClick={(postGroupId) =>
                router.push(
                  ROUTES.EDIT.ROOT({
                    agentId: params.agentId,
                    postGroupId,
                  })
                )
              }
              onItemRemove={(id) => {
                handleDeletePostGroup(id);
              }}
            />
          </div>
          <Spacing size={40} />
        </div>
      </div>
    </div>
  );
}
