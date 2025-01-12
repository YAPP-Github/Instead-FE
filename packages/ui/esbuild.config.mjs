import esbuild from 'esbuild';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';
import svgr from 'esbuild-plugin-svgr';
import { preserveDirectivesPlugin } from 'esbuild-plugin-preserve-directives';
import path from 'path';

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
  ],
  loader: { '.css': 'file' },
  allowOverwrite: true,
  outdir,
  external: ['react'],
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
