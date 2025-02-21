import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui', '@repo/theme'],
  experimental: {
    scrollRestoration: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: [
      'instead-dev.s3.ap-northeast-2.amazonaws.com',
      'pbs.twimg.com',
      'lh3.googleusercontent.com',
    ],
  },
};

export default withVanillaExtract(nextConfig);
