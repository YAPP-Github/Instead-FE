'use client';

import { useForm } from 'react-hook-form';
import { Icon, Toast, Text, Badge, Checkbox, Label, TextField } from '@repo/ui';
import { overlay } from 'overlay-kit';

type FormValues = {
  topic: string;
  aiUpgrade: string;
};

export default function Home() {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      topic: '',
      aiUpgrade: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data);
    notify1(); // 성공 토스트 표시
  };

  const notify1 = () =>
    overlay.open(({ isOpen, close, unmount }) => (
      <Toast
        open={isOpen}
        onClose={close}
        leftAddon={<Toast.Icon toastType="success" />}
        onExited={unmount}
      >
        생성된 본문이 업데이트 됐어요!
      </Toast>
    ));

  const notify2 = () =>
    overlay.open(({ isOpen, close, unmount }) => (
      <Toast
        open={isOpen}
        onClose={close}
        leftAddon={<Toast.Icon toastType="error" />}
        onExited={unmount}
      >
        1개 이상의 게시물을 선택해주세요
      </Toast>
    ));

  return (
    <div>
      웹 1팀 파이팅!
      <Icon size={24} name="stack" type="stroke" />
      <Icon size={24} name="stack" type="fill" />
      <Icon size={24} name="stack" type="stroke" color="warning300" />
      <button onClick={notify1}>success 토스트 열기</button>
      <button onClick={notify2}>warning 토스트 열기</button>
      <Text.H1 color="grey950" fontSize={28} fontWeight="semibold">
        hihi
      </Text.H1>
      <div style={{ display: 'flex', gap: '8px' }}>
        <Badge size="medium" variant="neutral" shape="round">
          X Premium 계정 전용
        </Badge>
        <Badge size="medium" variant="primary" shape="round">
          X Premium 계정 전용
        </Badge>
        <Badge size="medium" variant="pink" shape="square">
          전체 적용
        </Badge>
        <Badge size="medium" variant="blue" shape="square">
          개별 적용
        </Badge>
        <Badge size="large" variant="neutral" shape="square">
          요약
        </Badge>
      </div>
      <Checkbox />
      <Checkbox label="체크박스" />
      <Checkbox label="체크박스" disabled checked />
      <Checkbox label="체크박스" disabled />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Label variant="default">어떤 글을 생성할까요?</Label>
        <Label variant="required">어떤 글을 생성할까요?</Label>
        <Label variant="optional">어떤 글을 생성할까요?</Label>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <TextField id="basic-field">
            <TextField.Label>주제</TextField.Label>
            <TextField.Input
              placeholder="주제를 적어주세요"
              maxLength={500}
              {...register('topic', {
                required: '주제를 입력해주세요',
                maxLength: {
                  value: 500,
                  message: '500자 이내로 입력해주세요',
                },
              })}
            />
          </TextField>

          <TextField id="ai-field" variant="button">
            <TextField.Label>AI 업그레이드</TextField.Label>
            <TextField.Input
              placeholder="AI에게 요청하여 글 업그레이드하기"
              maxLength={500}
              showCounter
              {...register('aiUpgrade')}
            />
            <TextField.Submit type="submit" />
          </TextField>

          <TextField id="ai-field" variant="button" isError>
            <TextField.Label>AI 업그레이드</TextField.Label>
            <TextField.Input
              placeholder="AI에게 요청하여 글 업그레이드하기"
              maxLength={500}
              showCounter
              {...register('aiUpgrade')}
            />
            <TextField.Submit type="submit" />
          </TextField>
        </div>
      </form>
    </div>
  );
}
