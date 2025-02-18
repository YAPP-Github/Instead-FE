'use client';

import * as style from './pageStyle.css';
import { useRouter } from 'next/navigation';
import { Button, Label, RadioCards, Spacing, TextField } from '@repo/ui';
import { PersonalizeFormValues, PersonalizePageProps } from './type';
import { TitleWithDescription } from '@web/components/common/TitleWithDescription/TitleWithDescription';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { isEmptyStringOrNil } from '@web/utils';
import { useToast } from '@repo/ui/hooks';
import { useUpdatePersonalSettingMutation } from '@web/store/mutation/useUpdatePersonalSettingMutation';

export default function Personalize({ params }: PersonalizePageProps) {
  const router = useRouter();
  const toast = useToast();
  const { register, watch, setValue, handleSubmit, control } =
    useForm<PersonalizeFormValues>({
      defaultValues: {
        domain: '',
        introduction: '',
        tone: '~해요',
        customTone: '',
      },
    });
  const toneValue = watch('tone');

  const { mutate: updatePersonalSetting } = useUpdatePersonalSettingMutation({
    agentId: params.agentId,
  });

  const onSubmit = (data: PersonalizeFormValues) => {
    if (
      isEmptyStringOrNil(data.domain) ||
      isEmptyStringOrNil(data.introduction) ||
      isEmptyStringOrNil(data.tone)
    ) {
      return toast.error('모든 필드를 입력해주세요');
    }
    if (
      toneValue === '~직접 입력할게요' &&
      isEmptyStringOrNil(data.customTone)
    ) {
      return toast.error('말투를 입력해주세요');
    }
    updatePersonalSetting(data);
  };

  return (
    <div className={style.mainStyle}>
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
          <TextField variant="default">
            <TextField.Label>활동 분야</TextField.Label>
            <TextField.Input
              {...register('domain')}
              placeholder="20자 이내로 입력해주세요"
              maxLength={20}
            />
          </TextField>
          <Spacing size={32} />
          <TextField variant="default">
            <TextField.Label>계정 소개</TextField.Label>
            <TextField.Input
              {...register('introduction')}
              placeholder="계정과 관련된 업데이트나 소식을 추가하세요"
              maxLength={500}
            />
          </TextField>
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
                    if (newValue !== '~직접 입력할게요') {
                      setValue('customTone', '');
                    }
                  }}
                >
                  <RadioCards.Item value="~해요">~해요</RadioCards.Item>
                  <RadioCards.Item value="~합니다">~합니다</RadioCards.Item>
                  <RadioCards.Item value="~해">~~해</RadioCards.Item>
                  <RadioCards.Item value="~직접 입력할게요">
                    직접 입력할게요
                  </RadioCards.Item>
                </RadioCards>
              )}
            />
            {toneValue === '~직접 입력할게요' && (
              <TextField variant="default">
                <TextField.Input
                  {...register('customTone')}
                  placeholder="예시: 아저씨 같은 말투, ~했습니다"
                  maxLength={50}
                />
              </TextField>
            )}
          </div>
          <Spacing size={80} />
          <Button
            size="large"
            variant="neutral"
            className={style.submitButtonStyle}
            type="submit"
          >
            저장하기
          </Button>
        </form>
      </div>
    </div>
  );
}
