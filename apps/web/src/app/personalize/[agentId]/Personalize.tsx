'use client';

import { useRouter } from 'next/navigation';
import { Icon, FixedBottomCTA, Spacing, Breadcrumb } from '@repo/ui';
import { PersonalizeFormValues, PersonalizePageProps } from './type';
import { TitleWithDescription } from '@web/components/common/TitleWithDescription/TitleWithDescription';
import { useForm } from 'react-hook-form';
import { isEmptyStringOrNil } from '@web/utils';
import { useToast } from '@repo/ui/hooks';
import { useUpdatePersonalSettingMutation } from '@web/store/mutation/useUpdatePersonalSettingMutation';
import { AccountSidebar } from '@web/components/common/AccountSidebar/AccountSidebar';
import { ROUTES } from '@web/routes';
import { Agent } from '@web/types';
import { useQueryClient } from '@tanstack/react-query';
import {
  MainBreadcrumbItem,
  NavBar,
  UserProfileDropdown,
} from '@web/components/common';
import { useScroll } from '@web/hooks';
import * as style from './pageStyle.css';
import { Suspense } from 'react';
import { PersonalizeFormContent } from './_components/PersonalizeFormContent/PersonalizeFormContent';
import { PersonalizeFormContentSkeleton } from './_components/PersonalizeFormContent/PersonalizeFormContentSkeleton';

export default function Personalize({ params }: PersonalizePageProps) {
  const router = useRouter();
  const toast = useToast();
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });

  const { mutate: updatePersonalSetting } = useUpdatePersonalSettingMutation({
    agentId: Number(params.agentId),
  });
  const queryClient = useQueryClient();

  const methods = useForm<PersonalizeFormValues>({
    defaultValues: {
      domain: '',
      introduction: '',
      tone: 'CASUAL',
      customTone: '',
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: PersonalizeFormValues) => {
    if (data.tone === 'CUSTOM' && isEmptyStringOrNil(data.customTone)) {
      return toast.error('말투를 입력해주세요');
    }

    updatePersonalSetting(data);
  };

  const handleAccountClick = (id: Agent['id']) => {
    queryClient.clear();
    router.push(ROUTES.HOME.DETAIL(id));
  };

  return (
    <>
      <div className={style.mainStyle} ref={scrollRef}>
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
        <AccountSidebar
          selectedId={Number(params.agentId)}
          onAccountClick={handleAccountClick}
        />
        <div className={style.contentWrapperStyle}>
          <form
            className={style.formSectionStyle}
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className={style.titleSectionStyle}>
              <TitleWithDescription
                title="개인화 설정"
                description={`글을 생성할 때 계정과 관련된 업데이트나 소식을 참고하고 \n특정 활동 분야에 집중하거나, 특정 말투를 사용하여 글을 만들 수 있어요`}
              />
            </div>
            <Spacing size={16} />
            <Suspense fallback={<PersonalizeFormContentSkeleton />}>
              <PersonalizeFormContent methods={methods} params={params} />
            </Suspense>
            <Spacing size={128} />
          </form>
        </div>
      </div>
      <FixedBottomCTA
        type="submit"
        leftAddon={<Icon name="check" />}
        onClick={handleSubmit(onSubmit)}
      >
        저장하기
      </FixedBottomCTA>
    </>
  );
}
