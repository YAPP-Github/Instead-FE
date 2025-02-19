'use client';

import Image from 'next/image';
import {
  content,
  gradientButton,
  image,
  logo,
  text,
  textAlignCenter,
  wrapper,
} from './page.css';
import InsteadLogoImage from '@web/assets/images/instead.svg';
import { Spacing } from '@repo/ui/Spacing';
import JoinImage from '@web/assets/images/join.png';
import { useToast } from '@repo/ui/hooks';
import { useEffect } from 'react';
import GoogleIcon from '@web/assets/images/google.svg';
import { Text } from '@repo/ui/Text';

export default function JoinPage() {
  console.log(InsteadLogoImage);
  const toast = useToast();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('toast') === '401') {
      toast.error('로그인이 필요해요!');
    }
  }, [toast]);

  const handleGoogleLogin = () => {
    window.location.href = process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL ?? '';
  };
  return (
    <div className={wrapper}>
      <Image src={JoinImage} alt="login image" className={image} />
      <div className={content}>
        {/* <Image src={InsteadLogoImage} width={150} height={40.27} /> */}
        <div className={logo}>
          <InsteadLogoImage />
        </div>
        <Spacing size={40} />
        <p className={text}>
          피드 생성부터 업로드까지,
          <br />
          완전 자동화의 시작
        </p>
        <button className={gradientButton} onClick={handleGoogleLogin}>
          <GoogleIcon />
          Google 로그인하기
        </button>

        <Text
          className={textAlignCenter}
          color="grey400"
          fontSize={20}
          fontWeight="medium"
        >
          로그인은 개인 정보 보호 정책 및 서비스 약관에 동의하는 것을 의미하며,
          <br />
          서비스 이용을 위해 이메일과 이름, 프로필 이미지를 수집합니다.
        </Text>
      </div>
    </div>
  );
}
