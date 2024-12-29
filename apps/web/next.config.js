/** @type {import('next').NextConfig} */
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {};

// TODO 디자인 시스템 패키지 추가 필요
// https://vanilla-extract.style/documentation/integrations/next/
// const nextConfig = {
//   transpilePackages: ['@company/design-system'],
// };

module.exports = withVanillaExtract(nextConfig);
