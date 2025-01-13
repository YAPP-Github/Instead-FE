'use client';

import { Icon, Toast, Text, Badge } from '@repo/ui';
import { overlay } from 'overlay-kit';

export default function Home() {
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
    </div>
  );
}
