'use client';

import { MainBreadcrumbItem, NavBar } from '@web/components/common';
import { AccountSidebar } from '@web/components/common/AccountSidebar/AccountSidebar';
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
import { CTACard } from './[agentId]/_components/CTACard/CTACard';
import { PersonalCard } from './[agentId]/_components/PersonalCard/PersonalCard';
import { UploadContentCard } from './[agentId]/_components/UploadContentCard/UploadContentCard';
import { ContentGroupCard } from './[agentId]/_components/ContentGroupCard/ContentGroupCard';
import { Spacing } from '@repo/ui/Spacing';
import { useGetAgentQuery } from '@web/store/query/useGetAgentQuery';
import { useRouter } from 'next/navigation';
import { Agent, PostGroupId } from '@web/types';
import { useModal } from '@repo/ui/hooks';
import { Modal } from '@repo/ui/Modal';
import { useGetUserQuery } from '@web/store/query/useGetUserQuery';

export default function Home() {
  const router = useRouter();
  const modal = useModal();
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });
  const { data: user } = useGetUserQuery();
  const { data: agentData } = useGetAgentQuery();

  const userData = user.data.user;

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
        rightAddon={
          <Dropdown>
            <Dropdown.Trigger>
              {isNil(userData?.profileImage) ? (
                <div className={image} />
              ) : (
                <Image
                  className={image}
                  width={40}
                  height={40}
                  src={userData.profileImage}
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
                <PersonalCard text={'개인화 설정'} />
              </div>

              {/* 업로드 예약 일정 카드 */}
              <UploadContentCard text={'업로드 예약 일정'} />
            </div>

            {/* 생성된 주제 카드 */}
            <ContentGroupCard text="생성된 주제" />
          </div>
        </div>
      </div>
    </div>
  );
}
