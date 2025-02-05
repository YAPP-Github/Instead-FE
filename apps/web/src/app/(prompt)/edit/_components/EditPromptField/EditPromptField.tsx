'use client';

import { Checkbox } from '@repo/ui/Checkbox';
import { TextField } from '@repo/ui/TextField';
import { useFormContext } from 'react-hook-form';
import { wrapper } from './EditPromptField.css';
import { Spacing } from '@repo/ui/Spacing';

export function EditPromptField() {
  const { register } = useFormContext();
  return (
    <div className={wrapper}>
      <Spacing size={8} />
      <Checkbox
        label="수정 중인 글을 모두 업그레이드하기"
        defaultChecked
        onChange={(checked) => console.log(checked)}
      />
      <Spacing size={16} />
      <TextField id="ai-field" variant="button">
        <TextField.Input
          placeholder="AI에게 요청하여 글 업그레이드하기"
          {...register('prompt', {
            required: '메시지를 입력해주세요',
          })}
        />
        <TextField.Submit type="submit" />
      </TextField>
    </div>
  );
}
