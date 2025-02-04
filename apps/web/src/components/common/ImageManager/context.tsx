import { createContext, useContext } from 'react';
import type { ImageFile } from './types';

export type ImageManagerContextValue = {
  images: ImageFile[];
  onUpload: (files: FileList) => void;
  onRemove: (id: string) => void;
};

const ImageManagerContext = createContext<ImageManagerContextValue | null>(
  null
);

export const useImageManager = () => {
  const context = useContext(ImageManagerContext);
  if (!context) {
    throw new Error('ImageManager 컴포넌트 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

export const ImageManagerProvider = ImageManagerContext.Provider;
