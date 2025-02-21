'use client';
import { TextField } from '@repo/ui/TextField';
import { useForm } from 'react-hook-form';
import { wrapper } from './EditPromptField.css';
import { isEmptyStringOrNil } from '@web/utils';
import { useParams, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { DetailPageContext } from '../../EditDetail';
import { useUpdateSinglePostPromptMutation } from '@web/store/mutation/useUpdateSinglePostPromptMutation';

export function EditPromptField() {
  const { register, watch, handleSubmit } = useForm<{
    prompt: string;
  }>({
    defaultValues: {
      prompt: '',
    },
  });
  const { setLoadingPosts } = useContext(DetailPageContext);
  const prompt = watch('prompt');
  const isSubmitDisabled = isEmptyStringOrNil(prompt);
  const { agentId, postGroupId } = useParams();
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');

  const { mutate: updateSinglePrompt, isPending: isUpdateSinglePromptPending } =
    useUpdateSinglePostPromptMutation({
      agentId: Number(agentId),
      postGroupId: Number(postGroupId),
      postId: Number(postId),
    });

  // TODO 제거 예정
  useEffect(() => {
    if (isUpdateSinglePromptPending) {
      setLoadingPosts([Number(postId)]);
    } else {
      setLoadingPosts((prev) => prev.filter((id) => id !== Number(postId)));
    }
  }, [isUpdateSinglePromptPending]);

  const onSubmit = async (data: { prompt: string }) => {
    updateSinglePrompt({ ...data });
  };

  return (
    <div className={wrapper}>
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
