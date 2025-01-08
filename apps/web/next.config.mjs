import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
const withVanillaExtract = createVanillaExtractPlugin();

// TODO 디자인 시스템 패키지 추가 필요
// https://vanilla-extract.style/documentation/integrations/next/
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/theme'],
};

export default withVanillaExtract(nextConfig);
