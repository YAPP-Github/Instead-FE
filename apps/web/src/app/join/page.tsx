'use client';

import Image from 'next/image';
import { content, image, logo, text, wrapper } from './page.css';
import InsteadLogoImage from '@web/assets/images/instead.svg';
import { Spacing } from '@repo/ui/Spacing';
import JoinImage from '@web/assets/images/join.png';
import { useRouter } from 'next/navigation';

export default function JoinPage() {
  console.log(InsteadLogoImage);
  const handleGoogleLogin = () => {
    window.location.href = '/api/auth/google';
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
        <button onClick={handleGoogleLogin}>Google 로그인하기</button>
      </div>
    </div>
  );
}
