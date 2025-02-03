'use client';

import { Icon, Text } from '@repo/ui';
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
  onChange?: (files: File[]) => void;
  value?: File[];
};

export const TypeA = ({
  maxFileSize = 10,
  maxFiles = 5,
  onChange,
  value = [],
}: ImageManagerTypeAProps) => {
  if (maxFileSize <= 0) throw new Error('maxFileSize는 0보다 커야합니다.');
  if (maxFiles <= 0) throw new Error('maxFiles는 0보다 커야합니다.');

  const [images, setImages] = useState<ImageFile[]>(
    value.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
    }))
  );

  const toast = useToast();

  const handleUpload = useCallback(
    (files: FileList) => {
      const oversizedFiles = Array.from(files).filter(
        (file) => file.size > maxFileSize * 1024 * 1024
      );

      if (oversizedFiles.length > 0) {
        toast.error(`파일 크기는 ${maxFileSize}MB 이하여야 해요.`, 3000);
        return;
      }

      if (images.length + files.length > maxFiles) {
        toast.error(
          `이미지는 최대 ${maxFiles}장까지 업로드할 수 있어요.`,
          3000
        );
        return;
      }

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

      const updatedImages = [...images, ...newFiles];

      setImages(updatedImages);
      onChange?.(updatedImages.map((img) => img.file)); // 🔹 변경: File 객체를 넘김
    },
    [images, maxFiles, maxFileSize, toast, onChange]
  );

  const handleRemove = useCallback(
    (id: string) => {
      setImages((prevImages) => {
        const updatedImages = prevImages.filter((image) => image.id !== id);
        onChange?.(updatedImages.map((img) => img.file)); // 🔹 삭제 후 File 배열 업데이트
        return updatedImages;
      });
    },
    [onChange]
  );

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
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
