'use client';

import { Icon, Text } from '@repo/ui';
import { useToast } from '@repo/ui/hooks';
import { ImageManagerProvider } from './context';
import { ImageUploader } from './ImageUploader';
import { UploadedImages } from './UploadedImages';
import * as styles from './TypeA.css';
import { useState, useCallback, useEffect } from 'react';
import type { ImageFile } from './types';

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
  /**
   * 이미지 업로드 콜백
   */
  onUpload?: (files: File[]) => void;
  /**
   * 이미지 삭제 콜백
   */
  onRemove?: (url: string) => void;
  /**
   * 이미지 값
   * @default []
   */
  value?: string[];
};

export const TypeA = ({
  maxFileSize = 10,
  maxFiles = 5,
  onUpload,
  onRemove,
  value = [],
}: ImageManagerTypeAProps) => {
  if (maxFileSize <= 0) throw new Error('maxFileSize는 0보다 커야합니다.');
  if (maxFiles <= 0) throw new Error('maxFiles는 0보다 커야합니다.');

  const [images, setImages] = useState<ImageFile[]>(() =>
    value.map((url) => ({
      id: crypto.randomUUID(),
      url,
    }))
  );

  const toast = useToast();

  const handleUpload = useCallback(
    (files: FileList) => {
      if (files.length + value.length > maxFiles) {
        toast.error(`이미지는 최대 ${maxFiles}장까지 업로드할 수 있어요.`);
        return;
      }

      onUpload?.(Array.from(files));
    },
    [maxFiles, value.length, onUpload, toast]
  );

  const handleRemove = useCallback(
    (id: string) => {
      const imageToRemove = images.find((image) => image.id === id);
      if (imageToRemove) {
        onRemove?.(imageToRemove.url);
      }
    },
    [images, onRemove]
  );

  useEffect(() => {
    setImages(
      value.map((url) => ({
        id: crypto.randomUUID(),
        url,
      }))
    );
  }, [value]);

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.url));
    };
  }, [images]);

  return (
    <ImageManagerProvider
      value={{ images, onUpload: handleUpload, onRemove: handleRemove }}
    >
      <ImageUploader>
        <div className={styles.textContent({ isCenter: images.length === 0 })}>
          <Icon name="plusPicture" size={24} color="grey500" />
          <Text.Span color="grey600" fontSize={18} fontWeight="medium">
            이곳에 이미지를 드래그하거나 클릭하여 업로드
          </Text.Span>
          {images.length === 0 && (
            <Text.Span color="grey300" fontSize={18} fontWeight="medium">
              최대 {maxFiles}장, 각 {maxFileSize}MB 이하
            </Text.Span>
          )}
        </div>
        {images.length > 0 && (
          <div className={styles.imagesContent}>
            <UploadedImages images={images} onRemove={handleRemove} />
          </div>
        )}
      </ImageUploader>
    </ImageManagerProvider>
  );
};
