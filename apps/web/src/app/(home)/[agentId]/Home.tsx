'use client';

import { MainBreadcrumbItem, NavBar } from '@web/components/common';
import { AccountSidebar } from '../../../components/common/AccountSidebar/AccountSidebar';
import { useScroll } from '@web/hooks';
import { ROUTES } from '@web/routes';
import { Breadcrumb } from '@repo/ui/Breadcrumb';
import {
  animatedText,
  background,
  cardContent,
  content,
  dropdownItem,
  image,
  cardColumn,
  cardRow,
  flexColumn,
} from './page.css';
import { Dropdown } from '@repo/ui/Dropdown';
import Image from 'next/image';
import { Icon } from '@repo/ui/Icon';
import { Text } from '@repo/ui/Text';
import { isNil } from '@repo/ui/utils';
import { GradientAnimatedText } from '@repo/ui/GradientAnimatedText';
import CreateImage from '@web/assets/images/createImage.webp';
import { CTACard } from './_components/CTACard/CTACard';
import { PersonalCard } from './_components/PersonalCard/PersonalCard';
import { UploadContentCard } from './_components/UploadContentCard/UploadContentCard';
import { ContentGroupCard } from './_components/ContentGroupCard/ContentGroupCard';
import { Spacing } from '@repo/ui/Spacing';
import { useGetAgentDetailQuery } from '@web/store/query/useGetAgentDetailQuery';
import { useGetAgentPostGroupsQuery } from '@web/store/query/useGetAgentPostGroupsQuery';
import { useGetAgentQuery } from '@web/store/query/useGetAgentQuery';
import { useGetAgentUploadReservedQuery } from '@web/store/query/useGetAgentUploadReserved';
import { HomePageProps } from './types';
import { useRouter } from 'next/navigation';
import { Agent, PostGroup, PostGroupId } from '@web/types';
import { useModal } from '@repo/ui/hooks';
import { Modal } from '@repo/ui/Modal';
import { useDeletePostGroupMutation } from '@web/store/mutation/useDeletePostGroupMutation';

export default function Home({ params }: HomePageProps) {
  const router = useRouter();
  const modal = useModal();
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });
  const { data: agentDetail } = useGetAgentDetailQuery({
    agentId: params.agentId,
  });
  const { data: agentUploadReserved } = useGetAgentUploadReservedQuery({
    agentId: params.agentId,
  });
  const { data: agentPostGroups } = useGetAgentPostGroupsQuery({
    agentId: params.agentId,
  });
  const { mutate: deletePostGroups } = useDeletePostGroupMutation({
    agentId: params.agentId,
  });
  const { data: agentData } = useGetAgentQuery();

  const agentDetailData = agentDetail.agentPersonalSetting;
  const agentUploadReservedData = agentUploadReserved.posts.slice(0, 4);

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

  const profileImageUrl = '';
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
        rightAddon={
          <Dropdown>
            <Dropdown.Trigger>
              {isNil(profileImageUrl) ? (
                <div className={image} />
              ) : (
                <Image
                  className={image}
                  width={40}
                  height={40}
                  src={profileImageUrl}
                  alt={''}
                />
              )}
            </Dropdown.Trigger>
            <Dropdown.Content align="right">
              <Dropdown.Item value="option1" className={dropdownItem}>
                <Icon name="clock" size="2.4rem" color="grey400" />
                <Text fontSize={18} fontWeight="medium" color="grey1000">
                  수정하기
                </Text>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        }
        isScrolled={isScrolled}
      />
      <div className={content}>
        <AccountSidebar
          agentData={agentData.agents}
          selectedId={params.agentId}
          onAccountClick={(id: Agent['id']) =>
            router.push(ROUTES.HOME.DETAIL(id))
          }
        />
        <div className={cardContent}>
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
                  onButtonClick={() => router.push(ROUTES.CREATE)}
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
        </div>
      </div>
    </div>
  );
}
