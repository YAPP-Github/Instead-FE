'use client';

import {
  MainBreadcrumbItem,
  NavBar,
  UserProfileDropdown,
} from '@web/components/common';
import { AccountSidebar } from '@web/components/common/AccountSidebar/AccountSidebar';
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
import { CTACard } from './[agentId]/_components/CTACard/CTACard';
import { PersonalCard } from './[agentId]/_components/PersonalCard/PersonalCard';
import { UploadContentCard } from './[agentId]/_components/UploadContentCard/UploadContentCard';
import { ContentGroupCard } from './[agentId]/_components/ContentGroupCard/ContentGroupCard';
import { Spacing } from '@repo/ui/Spacing';
import { useRouter } from 'next/navigation';
import { Agent } from '@web/types';
import { useToast } from '@repo/ui/hooks';

export default function Home() {
  const router = useRouter();
  const toast = useToast();
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });

  const handleCreateClick = () => {
    toast.error('SNS 계정 연동이 필요해요.');
    //TODO: 액션 필요
  };

  return (
    <div className={background} ref={scrollRef}>
      <NavBar
        leftAddon={
          <Breadcrumb>
            <Breadcrumb.Item>
              <MainBreadcrumbItem href={ROUTES.HOME.ROOT} />
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        rightAddon={<UserProfileDropdown />}
        isScrolled={isScrolled}
      />
      <div className={content}>
        <AccountSidebar
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
                <CTACard
                  text={'자동으로 글을 만들어보세요'}
                  buttonText={'주제 생성하기'}
                  onButtonClick={handleCreateClick}
                  imageSrc={CreateImage}
                  buttonDisabled
                />
                <Spacing size={16} />
                <PersonalCard />
              </div>

              <UploadContentCard />
            </div>
            <ContentGroupCard />
          </div>
          <Spacing size={40} />
        </div>
      </div>
    </div>
  );
}
