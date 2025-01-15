import fs from 'fs';
import path from 'path';

function toCamelCase(str: string): string {
  return str
    .replace(/[-_]+(.)?/g, (_, c: string) => (c ? c.toUpperCase() : ''))
    .replace(/^\w/, (c: string) => c.toLowerCase());
}

const LOTTIES_DIR: string = path.resolve(__dirname, '../../src/assets/lotties');

const OUTPUT_PATH: string = path.resolve(
  __dirname,
  '../../src/components/LottieAnimation/assets.ts'
);

const jsonFiles: string[] = fs
  .readdirSync(LOTTIES_DIR)
  .filter((file) => file.endsWith('.json'));

if (jsonFiles.length === 0) {
  console.log('No SVG files found in:', LOTTIES_DIR);
  process.exit(0);
}

const importStatements: string[] = [];
const lottieMapping: string[] = [];

jsonFiles.forEach((file) => {
  const baseName = path.basename(file, '.json');

  const importName: string = baseName;

  const lottieKey: string = toCamelCase(baseName);

  importStatements.push(
    `import ${importName} from '@/assets/lotties/${file}';`
  );

  lottieMapping.push(`  ${lottieKey}: ${importName}`);
});

const fileContent = `${importStatements.join('\n')}

export const lotties = {
${lottieMapping.join(',\n')}
};
`;

fs.writeFileSync(OUTPUT_PATH, fileContent, 'utf-8');

console.log(`로티 생성: ${OUTPUT_PATH}`);
