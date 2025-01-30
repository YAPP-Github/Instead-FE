'use client';

import { ChangeEvent, DragEvent, ReactNode, useCallback } from 'react';
import { useImageManager } from './context';
import * as styles from './ImageUploader.css';
import { validateFiles } from '@web/utils';
import { useToast } from '@repo/ui/hooks';

const KEY = {
  ENTER: 'Enter',
  SPACE: ' ',
} as const;

type ImageUploaderProps = {
  children: ReactNode;
};

export const ImageUploader = ({ children }: ImageUploaderProps) => {
  const { onUpload } = useImageManager();
  const toast = useToast();

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer.files);

      if (!validateFiles(files)) {
        toast.error(
          '유효하지 않은 파일이 포함되어 있어요. 이미지 파일(최대 5MB)만 업로드 가능해요.'
        );
        return;
      }

      if (validateFiles(files)) {
        onUpload(e.dataTransfer.files);
      }
    },
    [onUpload, toast]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const files = Array.from(e.target.files);

        if (!validateFiles(files)) {
          toast.error(
            '유효하지 않은 파일이 포함되어 있어요. 이미지 파일(최대 5MB)만 업로드 가능해요.'
          );
          return;
        }

        if (validateFiles(files)) {
          onUpload(e.target.files);
        }
      }
    },
    [onUpload, toast]
  );

  return (
    <label
      className={styles.uploader}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      aria-label="이미지 업로드"
      onKeyDown={(e) => {
        if (e.key === KEY.ENTER || e.key === KEY.SPACE) {
          e.preventDefault();
          e.currentTarget.click();
        }
      }}
    >
      {children}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className={styles.input}
        aria-hidden="true"
      />
    </label>
  );
};
