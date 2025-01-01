import { build } from 'esbuild';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

const isWatch = process.argv.includes('--watch');

build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  format: ['esm', 'cjs'],
  outdir: 'dist',
  plugins: [vanillaExtractPlugin()],
  external: ['react'],
  watch: isWatch,
}).catch(() => process.exit(1));
