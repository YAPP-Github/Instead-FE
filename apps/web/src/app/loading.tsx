'use client';

import { DynamicLottie } from '@repo/ui/LottieAnimation';
import star_loading from '@web/assets/lotties/star_loading.json';
import { wrapper } from './loading/page.css';

export default function Loading() {
  return (
    <div className={wrapper}>
      <DynamicLottie
        animationData={star_loading}
        width={'7.2rem'}
        height={'7.2rem'}
      />
    </div>
  );
}
