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

export default function Home() {
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });

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
        <AccountSidebar />
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
                  domain="활동 분야"
                  tone="CASUAL"
                  introduction="글을 생성할 때 계정과 관련된 업데이트나 소식을 참고하고
특정 활동 분야에 집중하거나, 특정 말투를 사용하여 글을 만들 수 있어요"
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
              postGroups={[
                {
                  id: 1,
                  topic: '점심 메뉴 추천',
                  purpose: 'OPINION',
                  reference: 'NONE',
                  newsCategory: 'ENVIRONMENT',
                  thumbnailImage:
                    'https://instead-dev.s3.ap-northeast-2.amazonaws.com/post-group/019504d8-92ee-713e-aea0-347ce4d7bebf',
                  length: 'SHORT',
                  content: "'이런 메뉴는 어떨까?'와 같은 마무리 멘트",
                  eof: false,
                  createdAt: '2025-01-01T00:00:00.000Z',
                  postGroupImages: [],
                },
                {
                  id: 2,
                  topic: '점심 메뉴 추천 2',
                  purpose: 'HUMOR',
                  reference: 'NONE',
                  newsCategory: 'GAME',
                  thumbnailImage:
                    'https://instead-dev.s3.ap-northeast-2.amazonaws.com/post-group/019504d8-92ee-713e-aea0-347ce4d7bebf',
                  length: 'SHORT',
                  content: "'이런 메뉴는 어떨까?'와 같은 마무리 멘트",
                  eof: false,
                  createdAt: '2025-01-01T00:00:00.000Z',
                  postGroupImages: [],
                },
                {
                  id: 3,
                  topic: '점심 메뉴 추천 3',
                  purpose: 'HUMOR',
                  reference: 'NONE',
                  newsCategory: 'GAME',
                  thumbnailImage:
                    'https://instead-dev.s3.ap-northeast-2.amazonaws.com/post-group/019504d8-92ee-713e-aea0-347ce4d7bebf',
                  length: 'SHORT',
                  content: "'이런 메뉴는 어떨까?'와 같은 마무리 멘트",
                  eof: false,
                  createdAt: '2025-01-01T00:00:00.000Z',
                  postGroupImages: [],
                },
              ]}
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
