'use client';

import { Icon } from '../../../../../../../packages/ui/src/components/Icon';
import { Text } from '../../../../../../../packages/ui/src/components/Text';
import { ImageManagerProvider } from './context';
import { ImageUploader } from './ImageUploader';
import { UploadedImages } from './UploadedImages';
import * as styles from './TypeA.css';
import { useState, useCallback, useEffect } from 'react';
import type { ImageFile } from './types';
import { useToast } from '../../../../../../../packages/ui/src/hooks';

export type ImageManagerTypeAProps = {
  /**
   * 이미지 파일 크기 제한 (MB)
   * @default 10
   */
  maxFileSize?: number;
  /**
   * 이미지 파일 최대 개수
   * @default 5
   */
  maxFiles?: number;
};

export const TypeA = ({
  maxFileSize = 10,
  maxFiles = 5,
}: ImageManagerTypeAProps) => {
  const [images, setImages] = useState<ImageFile[]>([]);
  const isImageUploaded = images.length > 0;
  const toast = useToast();
  const handleUpload = useCallback(
    (files: FileList) => {
      // 파일 크기 체크
      const oversizedFiles = Array.from(files).filter(
        (file) => file.size > maxFileSize * 1024 * 1024
      );

      if (oversizedFiles.length > 0) {
        toast.error(`파일 크기는 ${maxFileSize}MB 이하여야 해요.`, 3000);
        return;
      }

      // 최대 파일 개수 체크
      if (images.length + files.length > maxFiles) {
        toast.error(
          `이미지는 최대 ${maxFiles}장까지 업로드할 수 있어요.`,
          3000
        );
        return;
      }

      // 이미지 파일 타입 체크
      const invalidFiles = Array.from(files).filter(
        (file) => !file.type.startsWith('image/')
      );

      if (invalidFiles.length > 0) {
        toast.error('이미지 파일만 업로드할 수 있어요.', 3000);
        return;
      }

      const newFiles = Array.from(files).map((file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newFiles]);
    },
    [images.length, maxFiles, maxFileSize, toast]
  );

  const handleRemove = useCallback((id: string) => {
    setImages((prevImages) => {
      const targetImage = prevImages.find((image) => image.id === id);
      if (targetImage) {
        URL.revokeObjectURL(targetImage.preview);
      }
      return prevImages.filter((image) => image.id !== id);
    });
  }, []);

  // 컴포넌트 언마운트 시 메모리 정리
  useEffect(() => {
    return () => {
      images.forEach((image) => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [images]);

  return (
    <ImageManagerProvider
      value={{ images, onUpload: handleUpload, onRemove: handleRemove }}
    >
      <ImageUploader>
        <div
          className={styles.textContent({
            isCenter: !isImageUploaded,
          })}
        >
          <Icon name="plusPicture" size={24} color="grey500" />
          <Text.Span color="grey600" fontSize={18} fontWeight="medium">
            이곳에 이미지를 드래그하거나 클릭하여 업로드
          </Text.Span>
          {!isImageUploaded && (
            <Text.Span color="grey300" fontSize={18} fontWeight="medium">
              최대 {maxFiles}장, 각 {maxFileSize}MB이하
            </Text.Span>
          )}
        </div>
        {isImageUploaded && (
          <div className={styles.imagesContent}>
            <UploadedImages images={images} onRemove={handleRemove} />
          </div>
        )}
      </ImageUploader>
    </ImageManagerProvider>
  );
};
