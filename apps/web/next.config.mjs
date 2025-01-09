import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/theme'],
};

export default withVanillaExtract(nextConfig);
