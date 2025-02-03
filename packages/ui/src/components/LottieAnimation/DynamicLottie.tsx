import { ReactNode, useEffect, useState } from 'react';
import { LottieAnimationProps } from './LottieAnimation';

/**
 * LottieAnimation 컴포넌트를 동적으로 로드하는 컴포넌트
 */
export const DynamicLottie = (props: LottieAnimationProps) => {
  const [Lottie, setLottie] = useState<ReactNode>(null);

  useEffect(() => {
    const importLottie = () => import('./LottieAnimation');
    importLottie().then((lottie) =>
      setLottie(<lottie.LottieAnimation {...props} />)
    );
  }, []);

  return Lottie;
};
