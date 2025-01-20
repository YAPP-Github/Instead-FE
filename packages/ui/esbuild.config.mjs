import esbuild from 'esbuild';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import svgr from 'esbuild-plugin-svgr';
import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';
import path from 'path';
import copy from 'esbuild-plugin-copy';
import alias from 'esbuild-plugin-alias';

const outdir = path.join(process.cwd(), 'dist');

const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  plugins: [
    svgr(),
    vanillaExtractPlugin(),
    preserveDirectivesPlugin({
      directives: ['use client', 'use strict'],
      include: /\.(js|ts|jsx|tsx)$/,
      exclude: /node_modules/,
    }),
    copy({
      resolveFrom: 'cwd',
      assets: {
        from: ['./src/assets/**/*'],
        to: ['./dist/assets'],
      },
    }),
    alias({
      '@/components': path.resolve(process.cwd(), './dist/components/index.js'),
      '@/assets': path.resolve(process.cwd(), './dist/assets'),
      '@/hooks': path.resolve(process.cwd(), './dist/hooks'),
      '@/provider': path.resolve(process.cwd(), './dist/provider'),
      '@/scripts': path.resolve(process.cwd(), './dist/scripts'),
      '@/utils': path.resolve(process.cwd(), './dist/utils/index.js'),
    }),
  ],
  loader: { '.css': 'file' },
  allowOverwrite: true,
  outdir,
  external: ['react', 'react-dom'],
  minify: true,
  treeShaking: true,
};

esbuild
  .build({
    ...buildOptions,
    format: 'esm',
  })
  .catch(() => process.exit(1));

// TODO commonjs에서 빌드 오류 나는 현상
// esbuild
//   .build({
//     ...buildOptions,
//     format: 'cjs',
//   })
//   .catch(() => process.exit(1));
