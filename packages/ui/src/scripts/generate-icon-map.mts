import fs from 'fs';
import path from 'path';

// (선택) 파일명을 import할 때 사용할 변수명으로 변환하는 유틸 함수
// 예) "IconArrowBottom.svg" → "arrowBottom"
// 예) "icon_check.svg" → "iconCheck"
function toCamelCase(str: string): string {
  // 우선 ".svg" 제거, 그리고 "Icon" 접두어, 언더바, 대시 등을 제거
  const trimmed = str.replace(/^Icon/i, ''); // Icon 접두어 제거 (대소문자 무시)

  // 이어서 kebab-case, snake_case 등을 camelCase로 변환
  return trimmed
    .replace(/[-_]+(.)?/g, (_, c: string) => (c ? c.toUpperCase() : ''))
    .replace(/^\w/, (c: string) => c.toLowerCase()); // 첫 글자를 소문자로
}

// 아이콘 폴더 경로
const ICONS_DIR: string = path.resolve(__dirname, '../../src/assets/icons');

// 결과물을 저장할 파일 경로
const OUTPUT_PATH: string = path.resolve(
  __dirname,
  '../../src/components/Icon/assets.ts'
);

// .svg 파일 목록 가져오기
const svgFiles: string[] = fs
  .readdirSync(ICONS_DIR)
  .filter((file) => file.endsWith('.svg'));

if (svgFiles.length === 0) {
  console.log('No SVG files found in:', ICONS_DIR);
  process.exit(0);
}

// import 구문과 icon 매핑을 구성할 문자열 배열
const importStatements: string[] = [];
const iconMapping: string[] = [];

/**
 * 예시 결과 형태
 *
 * import IconArrowBottom from '@/assets/icons/IconArrowBottom.svg';
 * import IconClose from '@/assets/icons/IconClose.svg';
 *
 * export const icons = {
 *   arrowBottom: IconArrowBottom,
 *   close: IconClose,
 * };
 */

svgFiles.forEach((file) => {
  // 확장자(.svg) 없이 basename만 추출
  const baseName = path.basename(file, '.svg'); // 예: "IconArrowBottom"

  // import할 때 사용할 변수명 (원하면 toCamelCase/baseName 등 조합 가능)
  // 여기서는 원본 그대로 쓰지만, 필요하면 아래처럼 수정:
  // const importName = toCamelCase(baseName);
  const importName: string = baseName;

  // icons 객체의 key로 쓸 이름
  const iconKey: string = toCamelCase(baseName);

  // import 구문 생성
  importStatements.push(
    `import ${importName} from '../../assets/icons/${file}';`
  );

  // iconKey: importName 형태로 매핑
  iconMapping.push(`  ${iconKey}: ${importName}`);
});

// 최종 파일 콘텐츠 조합
const fileContent = `${importStatements.join('\n')}

export const icons = {
${iconMapping.join(',\n')}
};
`;

// 파일 생성/덮어쓰기
fs.writeFileSync(OUTPUT_PATH, fileContent, 'utf-8');

console.log(`아이콘 생성: ${OUTPUT_PATH}`);
