'use client';

import Image from 'next/image';
import * as styles from './page.css';
import InsteadLogoImage from '@web/assets/images/instead.svg';
import { Spacing } from '@repo/ui/Spacing';
import JoinImage from '@web/assets/images/join.png';
import { useToast, useModal } from '@repo/ui/hooks';
import { useEffect } from 'react';
import { Text } from '@repo/ui/Text';
import { GoogleLoginButton } from './_components/GoogleLoginButton/GoogleLoginButton';

export default function JoinPage() {
  const toast = useToast();
  const modal = useModal();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('toast') === '401') {
      toast.error('로그인이 필요해요!');
    }
  }, [toast]);

  const handleGoogleLogin = async () => {
    //window.location.href = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL ?? '';
    modal.alert({
      title: '서버 점검 중',
      description:
        '5/30(금) 오전 1시에 완료될 예정이에요\n이용에 불편을 드려 죄송해요',
      alertButton: '확인',
      isCloseOnDimmerClick: false,
    });
  };
  return (
    <div className={styles.wrapper}>
      <Image
        src={JoinImage}
        alt="로그인 배경 이미지"
        className={styles.image}
      />
      <div className={styles.content}>
        <div className={styles.logo}>
          <InsteadLogoImage width="15.1rem" height="4.027rem" />
        </div>
        <Spacing size={40} />
        <Text.H2
          color="grey700"
          fontWeight="semibold"
          fontSize={44}
          className={styles.text}
        >
          {`피드 생성부터 업로드까지,\n완전 자동화의 시작`}
        </Text.H2>
        <GoogleLoginButton onClick={handleGoogleLogin} />
        <Text.P
          className={styles.textAlignCenter}
          color="grey400"
          fontSize={20}
          fontWeight="medium"
        >
          {`로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,\n서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.`}
        </Text.P>
      </div>
    </div>
  );
}
