'use client';

import {
  MainBreadcrumbItem,
  NavBar,
  UserProfileDropdown,
} from '@web/components/common';
import { AccountSidebar } from '../../../components/common/AccountSidebar/AccountSidebar';
import { useScroll } from '@web/hooks';
import { ROUTES } from '@web/routes';
import {
  animatedText,
  background,
  cardContent,
  content,
  cardColumn,
  cardRow,
  flexColumn,
} from './page.css';
import { Breadcrumb, GradientAnimatedText, Spacing } from '@repo/ui';
import CreateImage from '@web/assets/images/createImage.webp';
import { CTACard } from './_components/CTACard/CTACard';
import { HomePageProps } from './types';
import { useRouter } from 'next/navigation';
import { Agent } from '@web/types';
import { AgentDetailPersonalCard } from './_components/AgentDetailPersonalCard/AgentDetailPersonalCard';
import { Suspense } from 'react';
import { PersonalCardSkeleton } from './_components/PersonalCard/PersonalCardSkeleton';
import { ReservedUploadContentCard } from './_components/ReservedUploadContentCard/ReservedUploadContentCard';
import { UploadContentCardSkeleton } from './_components/UploadContentCard/UploadContentCardSkeleton';
import { PostGroupsContentGroupCard } from './_components/PostGroupsContentGroupCard/PostGroupsContentGroupCard';
import { ContentGroupCardSkeleton } from './_components/ContentGroupCard/ContentGroupCardSkeleton';

export default function Home({ params }: HomePageProps) {
  const router = useRouter();
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });

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
                <Suspense fallback={<PersonalCardSkeleton />}>
                  <AgentDetailPersonalCard
                    agentId={Number(params.agentId)}
                    onIconClick={() =>
                      router.push(ROUTES.PERSONALIZE(params.agentId))
                    }
                  />
                </Suspense>
              </div>

              {/* 업로드 예약 일정 카드 */}
              <Suspense
                fallback={
                  <UploadContentCardSkeleton agentId={Number(params.agentId)} />
                }
              >
                <ReservedUploadContentCard agentId={Number(params.agentId)} />
              </Suspense>
            </div>

            {/* 생성된 주제 카드 */}
            <Suspense fallback={<ContentGroupCardSkeleton />}>
              <PostGroupsContentGroupCard agentId={Number(params.agentId)} />
            </Suspense>
          </div>
          <Spacing size={40} />
        </div>
      </div>
    </div>
  );
}
