'use client';

import { Checkbox } from '@repo/ui/Checkbox';
import { TextField } from '@repo/ui/TextField';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { wrapper } from './EditPromptField.css';
import { Spacing } from '@repo/ui/Spacing';
import { isEmptyStringOrNil } from '@web/utils';
import { usePatchPromptMutation } from '@web/store/mutation/usePatchPromptMutation';
import { useParams, useSearchParams } from 'next/navigation';
import { useContext, useEffect } from 'react';
import { DetailPageContext } from '../../EditDetail';
import { useGroupPostsQuery } from '@web/store/query/useGroupPostsQuery';
import { useGetAllPostsQuery } from '@web/store/query/useGetAllPostsQuery';

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
  const { loadingPosts, setLoadingPosts } = useContext(DetailPageContext);
  const isEntire = watch('isEntire');
  const prompt = watch('prompt');
  const isSubmitDisabled = isEmptyStringOrNil(prompt);
  const { agentId, postGroupId } = useParams();
  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const { data } = useGetAllPostsQuery({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
  });
  const posts = data?.data.posts ?? [];
  const editingPosts = Object.values(posts)
    .flat()
    .filter((post) => post.status === 'EDITING')
    .map((post) => post.id);

  const { mutate: patchPrompt, isPending } = usePatchPromptMutation({
    agentId: Number(agentId),
    postGroupId: Number(postGroupId),
    postId: Number(postId),
  });

  // TODO 제거 예정
  useEffect(() => {
    if (isPending) {
      // 요청이 진행 중이면
      if (isEntire) {
        setLoadingPosts(editingPosts);
      } else {
        setLoadingPosts([Number(postId)]);
      }
    } else {
      if (isEntire) {
        setLoadingPosts((prev) =>
          prev.filter((id) => !editingPosts.includes(id))
        );
      } else {
        setLoadingPosts((prev) => prev.filter((id) => id !== Number(postId)));
      }
    }
  }, [isPending]);

  const onSubmit = async (data: { isEntire: boolean; prompt: string }) => {
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
