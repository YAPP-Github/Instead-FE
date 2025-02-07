'use client';

import { Checkbox } from '@repo/ui/Checkbox';
import { TextField } from '@repo/ui/TextField';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { wrapper } from './EditPromptField.css';
import { Spacing } from '@repo/ui/Spacing';
import { isEmptyStringOrNil } from '@web/utils';
import { usePatchPromptMutation } from '@web/store/mutation/usePatchPromptMutation';
import { useParams, useSearchParams } from 'next/navigation';

export function EditPromptField() {
  const { register, watch, control, handleSubmit } = useForm<{
    isEntire: boolean;
    prompt: string;
  }>({
    defaultValues: {
      isEntire: false,
      prompt: '',
    },
  });
  const isEntire = watch('isEntire');
  const prompt = watch('prompt');
  const isSubmitDisabled = isEmptyStringOrNil(prompt);
  const { agentId, postGroupId } = useParams();
  const searchParams = useSearchParams();
  const postId = searchParams.get('post');
  const { mutate: patchPrompt } = usePatchPromptMutation({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
    postId: Number(postId),
  });

  const onSubmit = async (data: { isEntire: boolean; prompt: string }) => {
    console.log('Form Data:', data);
    patchPrompt({ ...data });
  };

  return (
    <div className={wrapper}>
      <Spacing size={8} />
      <Controller
        name="isEntire"
        control={control}
        render={({ field }) => (
          <Checkbox
            label="수정 중인 글을 모두 업그레이드하기"
            defaultChecked
            checked={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <Spacing size={16} />
      <TextField id="ai-field" variant="button">
        <TextField.Input
          sumbitButton={
            <TextField.Submit
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitDisabled}
            />
          }
          placeholder="AI에게 요청하여 글 업그레이드하기"
          {...register('prompt', {
            required: '메시지를 입력해주세요',
          })}
        />
      </TextField>
    </div>
  );
}
