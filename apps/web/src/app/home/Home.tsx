'use client';

import { MainBreadcrumbItem, NavBar } from '@web/components/common';
import { AccountSidebar } from './_components/AccountSidebar/AccountSidebar';
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

export default function Home() {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });
  const { data: agentDetail, isLoading: isDetailLoading } =
    useGetAgentDetailQuery({
      agentId: 1,
    });
  const { data: agentPostGroups, isLoading: isPostGroupsLoading } =
    useGetAgentPostGroupsQuery({
      agentId: 1,
    });
  const { data: agentData, isLoading: isAgentLoading } = useGetAgentQuery();

  const agentDetailData = agentDetail?.agentPersonalSetting;

  const profileImageUrl = '';
  return (
    <div className={background} ref={scrollRef}>
      <NavBar
        leftAddon={
          <Breadcrumb>
            <Breadcrumb.Item>
              <MainBreadcrumbItem href={ROUTES.HOME} />
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
        <AccountSidebar agentData={agentData.agents} />
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
                  onButtonClick={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  imageSrc={CreateImage}
                />
                <Spacing size={16} />
                {/* 개인화 설정 카드 */}
                <PersonalCard
                  text={'개인화 설정'}
                  data={agentDetailData}
                  onIconClick={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </div>

              {/* 업로드 예약 일정 카드 */}
              <UploadContentCard
                text={'업로드 예약 일정'}
                onMoreButtonClick={function (): void {
                  throw new Error('Function not implemented.');
                }}
                onItemClick={(id) => {
                  console.log('클릭한 아이템 id:', id);
                }}
                items={[
                  {
                    id: 1,
                    createdAt: '2025-01-01T00:00:00.000Z',
                    updatedAt: '2025-01-01T00:00:00.000Z',
                    displayOrder: 1,
                    summary: '오늘 점심 메뉴는 두부김치',
                    content: '엄청나게 긴 본문',
                    postImages: [
                      {
                        id: 1,
                        postId: 1,
                        url: 'https://~',
                      },
                    ],
                    status: 'GENERATED',
                    uploadTime: '2025-01-01T00:00:00.000Z',
                  },
                  {
                    id: 2,
                    createdAt: '2025-01-01T00:00:00.000Z',
                    updatedAt: '2025-01-01T00:00:00.000Z',
                    displayOrder: 2,
                    summary: '오늘 점심 메뉴는 두부김치2',
                    content: '엄청나게 긴 본문2',
                    postImages: [
                      {
                        id: 2,
                        postId: 2,
                        url: 'https://~',
                      },
                    ],
                    status: 'GENERATED',
                    uploadTime: '2025-01-01T00:00:00.000Z',
                  },
                ]}
              />
            </div>

            {/* 생성된 주제 카드 */}
            <ContentGroupCard
              text="생성된 주제"
              postGroups={agentPostGroups.postGroups}
              onItemClick={function (id: number | string): void {
                throw new Error('Function not implemented.');
              }}
              onItemRemove={function (id: number | string): void {
                throw new Error('Function not implemented.');
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
