'use client';

import { useGetAgentDetailQuery } from '@web/store/query/useGetAgentDetailQuery';
import { useEffect } from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { PersonalizeFormValues, PersonalizePageProps } from '../../type';
import { Spacing, TextField, Label, RadioCards } from '@repo/ui';
import { TONE_OPTIONS } from '../../type';
import * as style from './style.css';

type PersonalizeFormContentProps = {
  methods: UseFormReturn<PersonalizeFormValues>;
  params: PersonalizePageProps['params'];
};

export function PersonalizeFormContent({
  methods,
  params,
}: PersonalizeFormContentProps) {
  const { data: agentDetail } = useGetAgentDetailQuery({
    agentId: Number(params.agentId),
  });

  const { control, register, watch, setValue } = methods;

  useEffect(() => {
    if (agentDetail) {
      setValue('domain', agentDetail.agentPersonalSetting.domain);
      setValue('introduction', agentDetail.agentPersonalSetting.introduction);
      setValue('tone', agentDetail.agentPersonalSetting.tone);
      setValue('customTone', agentDetail.agentPersonalSetting.customTone);
    }
  }, [agentDetail, setValue]);

  const toneValue = watch('tone');

  return (
    <>
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
          <TextField variant="default" isError={field.value.length >= 500}>
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
    </>
  );
}
