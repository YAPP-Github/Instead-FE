import fs from 'fs';
import path from 'path';
import * as prettier from 'prettier';

// 설정
const SVG_DIR = 'src/assets/icons'; // SVG 파일이 있는 디렉토리
const COMPONENTS_DIR = 'src/components/Icon/assets'; // 리액트 컴포넌트 출력 디렉토리

// 파일명을 PascalCase로 변환하는 유틸리티
const toPascalCase = (str: string): string => {
  return str.replace(/(^\w|-\w)/g, clearAndUpper).replace(/\.svg$/i, '');
};

const clearAndUpper = (text: string): string => {
  return text.replace(/-/, '').toUpperCase();
};

// 디렉토리를 재귀적으로 순회하여 SVG 파일을 찾는 함수
const getSvgFiles = async (dir: string): Promise<string[]> => {
  let svgFiles: string[] = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const res = path.resolve(dir, file.name);
    if (file.isDirectory()) {
      const nestedFiles = await getSvgFiles(res);
      svgFiles = svgFiles.concat(nestedFiles);
    } else if (
      file.isFile() &&
      path.extname(file.name).toLowerCase() === '.svg'
    ) {
      svgFiles.push(res);
    }
  }

  return svgFiles;
};

// SVG 내용을 리액트 컴포넌트로 생성하는 함수
const generateReactComponent = (
  componentName: string,
  svgContent: string
): string => {
  // XML 선언이나 DOCTYPE 제거
  const cleanSvg = svgContent
    .replace(/<\?xml.*?\?>\s*/g, '')
    .replace(/<!DOCTYPE.*?>\s*/g, '')
    .trim();

  // `fill`, `stroke` 등의 속성을 props로 오버라이드할 수 있도록 변경
  // 이는 단순한 접근 방식입니다. 더 복잡한 SVG의 경우 SVGO 같은 라이브러리를 사용하는 것이 좋습니다.
  const svgWithProps = cleanSvg
    .replace(/(<svg[^>]*)(>)/, `$1 {...props}$2`)
    .replace(/class=/g, 'className=');

  return `
import type { SVGProps } from 'react';

interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {}

const ${componentName} = (props: SVGProps<SVGSVGElement>) => (
  ${svgWithProps}
);

export default ${componentName};
`;
};

// 메인 변환 함수
const convertSvgsToReactComponents = async () => {
  try {
    // SVG_DIR에서 모든 SVG 파일 찾기
    console.log('hihi');
    const svgFiles = await getSvgFiles(SVG_DIR);

    if (svgFiles.length === 0) {
      console.log('SVG 파일을 찾을 수 없습니다.');
      return;
    }

    // 각 SVG 파일 처리
    for (const svgFilePath of svgFiles) {
      const svgContent = await fs.promises.readFile(svgFilePath, 'utf8');
      const relativePath = path.relative(SVG_DIR, svgFilePath);
      const fileName = path.basename(relativePath, '.svg');
      const componentName = toPascalCase(fileName);
      const componentCode = generateReactComponent(componentName, svgContent);

      // Prettier로 코드 포맷팅
      const formattedCode = await prettier.format(componentCode, {
        parser: 'typescript',
      });

      // 출력 경로 정의
      const componentFilePath = path.join(
        COMPONENTS_DIR,
        `${componentName}.tsx`
      );

      // 컴포넌트 파일 쓰기
      await fs.promises.writeFile(componentFilePath, formattedCode, 'utf8');
      console.log(`${componentName}.tsx 파일이 생성되었습니다.`);
    }

    console.log('모든 SVG 파일이 리액트 컴포넌트로 변환되었습니다.');
  } catch (error) {
    console.error('SVG 변환 중 오류 발생:', error);
  }
};

// 변환 실행
convertSvgsToReactComponents();
