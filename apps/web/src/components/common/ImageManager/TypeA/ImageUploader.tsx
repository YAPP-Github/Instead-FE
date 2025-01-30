'use client';

import { ChangeEvent, DragEvent, ReactNode, useCallback } from 'react';
import { useImageManager } from './context';
import * as styles from './ImageUploader.css';

type ImageUploaderProps = {
  children: ReactNode;
};

export const ImageUploader = ({ children }: ImageUploaderProps) => {
  const { onUpload } = useImageManager();

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      onUpload(e.dataTransfer.files);
    },
    [onUpload]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        onUpload(e.target.files);
      }
    },
    [onUpload]
  );

  return (
    <label
      className={styles.uploader}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {children}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className={styles.input}
      />
    </label>
  );
};
