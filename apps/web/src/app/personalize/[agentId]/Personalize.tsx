'use client';

import { useRouter } from 'next/navigation';
import {
  Button,
  Icon,
  Label,
  RadioCards,
  Spacing,
  TextField,
  Text,
  Breadcrumb,
  Dropdown,
  Modal,
  FixedBottomCTA,
} from '@repo/ui';
import {
  PersonalizeFormValues,
  PersonalizePageProps,
  TONE_OPTIONS,
} from './type';
import { TitleWithDescription } from '@web/components/common/TitleWithDescription/TitleWithDescription';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { isEmptyStringOrNil } from '@web/utils';
import { useModal, useToast } from '@repo/ui/hooks';
import { useUpdatePersonalSettingMutation } from '@web/store/mutation/useUpdatePersonalSettingMutation';
import { AccountSidebar } from '@web/components/common/AccountSidebar/AccountSidebar';
import { ROUTES } from '@web/routes';
import { getAgentQueryOptions } from '@web/store/query/useGetAgentQuery';
import { Agent } from '@web/types';
import { useQueryClient, useSuspenseQueries } from '@tanstack/react-query';
import { MainBreadcrumbItem, NavBar } from '@web/components/common';
import Image from 'next/image';
import { isNil } from '@repo/ui/utils';
import { getUserQueryOptions } from '@web/store/query/useGetUserQuery';
import { useScroll } from '@web/hooks';
import * as style from './pageStyle.css';
import { useLogoutMutation } from '@web/store/mutation/useLogoutMutation';
import { getAgentDetailQueryOptions } from '@web/store/query/useGetAgentDetailQuery';

export default function Personalize({ params }: PersonalizePageProps) {
  const router = useRouter();
  const toast = useToast();
  const modal = useModal();
  const [scrollRef, isScrolled] = useScroll<HTMLDivElement>({
    threshold: 100,
  });

  const [{ data: agentData }, { data: agentDetail }, { data: user }] =
    useSuspenseQueries({
      queries: [
        getAgentQueryOptions(),
        getAgentDetailQueryOptions({ agentId: params.agentId }),
        getUserQueryOptions(),
      ],
    });
  const { mutate: updatePersonalSetting } = useUpdatePersonalSettingMutation({
    agentId: params.agentId,
  });
  const { mutate: logout } = useLogoutMutation();
  const queryClient = useQueryClient();

  const { register, watch, setValue, handleSubmit, control } =
    useForm<PersonalizeFormValues>({
      defaultValues: {
        domain: agentDetail.agentPersonalSetting.domain,
        introduction: agentDetail.agentPersonalSetting.introduction,
        tone: agentDetail.agentPersonalSetting.tone,
        customTone: agentDetail.agentPersonalSetting.customTone,
      },
    });
  const toneValue = watch('tone');

  const onSubmit = (data: PersonalizeFormValues) => {
    if (
      toneValue === TONE_OPTIONS.CUSTOM &&
      isEmptyStringOrNil(data.customTone)
    ) {
      return toast.error('말투를 입력해주세요');
    }

    const isFormValueChanged =
      data.domain !== agentDetail.agentPersonalSetting.domain ||
      data.introduction !== agentDetail.agentPersonalSetting.introduction ||
      data.tone !== agentDetail.agentPersonalSetting.tone ||
      data.customTone !== agentDetail.agentPersonalSetting.customTone;

    if (!isFormValueChanged) {
      toast.success('저장되었어요');
      router.push(ROUTES.HOME.DETAIL(params.agentId));
      return;
    }

    updatePersonalSetting(data);
  };

  const handleAccountClick = (id: Agent['id']) => {
    queryClient.clear();
    router.push(ROUTES.HOME.DETAIL(id));
  };

  const handleLogoutClick = () => {
    modal.confirm({
      title: '정말 로그아웃 하시겠어요??',
      icon: <Modal.Icon name="notice" color="warning500" />,
      confirmButton: '로그아웃',
      cancelButton: '취소',
      confirmButtonProps: {
        onClick: () => {
          logout();
        },
      },
    });
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
          rightAddon={
            <Dropdown>
              <Dropdown.Trigger>
                {isNil(user.data.profileImage) ? (
                  <div className={style.image} />
                ) : (
                  <Image
                    className={style.image}
                    width={40}
                    height={40}
                    src={user.data.profileImage}
                    alt="프로필"
                  />
                )}
              </Dropdown.Trigger>
              <Dropdown.Content align="right">
                <Dropdown.Item
                  onClick={handleLogoutClick}
                  value="option1"
                  className={style.dropdownItem}
                >
                  <Icon name="logout" size="2.4rem" color="grey400" />
                  <Text.P fontSize={18} fontWeight="medium" color="grey1000">
                    로그아웃
                  </Text.P>
                </Dropdown.Item>
              </Dropdown.Content>
            </Dropdown>
          }
          isScrolled={isScrolled}
        />
        <AccountSidebar
          agentData={agentData.agents}
          selectedId={params.agentId}
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
            <Controller
              name="domain"
              control={control}
              render={({ field }) => (
                <TextField variant="default" isError={field.value.length >= 20}>
                  <TextField.Label>활동 분야</TextField.Label>
                  <TextField.Input
                    {...field}
                    placeholder="20자 이내로 입력해주세요"
                    maxLength={20}
                    showCounter
                  />
                </TextField>
              )}
            />
            <Spacing size={32} />
            <Controller
              name="introduction"
              control={control}
              render={({ field }) => (
                <TextField
                  variant="default"
                  isError={field.value.length >= 500}
                >
                  <TextField.Label>계정 소개</TextField.Label>
                  <TextField.Input
                    {...field}
                    placeholder="계정과 관련된 업데이트나 소식을 추가하세요"
                    maxLength={500}
                    showCounter
                  />
                </TextField>
              )}
            />
            <Spacing size={32} />
            <div className={style.utteranceWrapperStyle}>
              <Label>말투</Label>
              <Controller
                name="tone"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <RadioCards
                    columns={4}
                    value={value}
                    onChange={(newValue) => {
                      onChange(newValue);
                      if (newValue !== TONE_OPTIONS.CUSTOM) {
                        setValue('customTone', '');
                      }
                    }}
                  >
                    <RadioCards.Item value={TONE_OPTIONS.CASUAL}>
                      <RadioCards.Label>~해요</RadioCards.Label>
                    </RadioCards.Item>
                    <RadioCards.Item value={TONE_OPTIONS.MORE_FORMAL}>
                      <RadioCards.Label>~합니다</RadioCards.Label>
                    </RadioCards.Item>
                    <RadioCards.Item value={TONE_OPTIONS.LESS_FORMAL}>
                      <RadioCards.Label>~해</RadioCards.Label>
                    </RadioCards.Item>
                    <RadioCards.Item value={TONE_OPTIONS.CUSTOM}>
                      <RadioCards.Label>직접 입력할게요</RadioCards.Label>
                    </RadioCards.Item>
                  </RadioCards>
                )}
              />
              {toneValue === TONE_OPTIONS.CUSTOM && (
                <TextField
                  variant="default"
                  isError={watch('customTone').length >= 50}
                >
                  <TextField.Input
                    {...register('customTone')}
                    placeholder="예시: 아저씨 같은 말투, ~했습니다"
                    maxLength={50}
                    showCounter
                  />
                </TextField>
              )}
            </div>
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
