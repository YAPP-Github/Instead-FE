'use client';

import { TypeA } from './TypeA/TypeA';
import { TypeB } from './TypeB/TypeB';

type ImageManagerComposition = {
  TypeA: typeof TypeA;
  TypeB: typeof TypeB;
};
/**
 *
 * @example
 * ```tsx
 * // Prompt 등에서 사용하게 되는 TypeA
 * <ImageManager.TypeA maxFileSize={5} maxFiles={3} />
 *
 * // TypeB TODO: 나연님 추가해주세요!
 * <ImageManager.TypeB />
 * ```
 */
export const ImageManager: ImageManagerComposition = Object.assign({
  TypeA,
  TypeB,
});

export type { ImageManagerTypeAProps } from './TypeA/TypeA';
