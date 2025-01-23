import esbuild from 'esbuild';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import svgr from 'esbuild-plugin-svgr';
import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';

const buildOptions = {
  entryPoints: ['./src/index.ts'],
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
  ],
  loader: { '.css': 'file' },
  allowOverwrite: true,
  external: ['react', 'react-dom'],
  minify: true,
  treeShaking: true,
  outdir: 'dist',
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
