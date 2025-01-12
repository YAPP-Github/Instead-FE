'use client';

import { Icon, Toast } from '@repo/ui';
import { overlay, OverlayProvider } from 'overlay-kit';

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
    <OverlayProvider>
      <div>
        웹 1팀 파이팅!
        <Icon size={24} name="stack" type="stroke" />
        <Icon size={24} name="stack" type="fill" />
        <Icon size={24} name="stack" type="stroke" color="warning300" />
        <button onClick={notify1}>success 토스트 열기</button>
        <button onClick={notify2}>warning 토스트 열기</button>
      </div>
    </OverlayProvider>
  );
}
