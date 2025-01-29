'use client';

import { Icon } from '@repo/ui';
import * as styles from './UploadedImages.css';
import Image from 'next/image';
import type { ImageFile } from './types';
import type { ImageManagerContextValue } from './context';

type UploadedImagesProps = {
  images: ImageFile[];
} & Pick<ImageManagerContextValue, 'onRemove'>;

const IMAGE_SIZE = 64;

export const UploadedImages = ({ images, onRemove }: UploadedImagesProps) => {
  return (
    <div className={styles.container}>
      {images.map((image) => (
        <div
          key={image.id}
          className={styles.imageWrapper}
          onClick={(e) => e.preventDefault()} // 이미지 클릭 시 삭제 방지
        >
          <Image
            src={image.preview}
            alt=""
            width={IMAGE_SIZE}
            height={IMAGE_SIZE}
            className={styles.image}
          />
          <button
            type="button"
            className={styles.removeButton}
            onClick={(e) => {
              e.preventDefault(); // 기본 동작 차단
              e.stopPropagation(); // 이벤트 전파 차단
              onRemove(image.id); // 해당하는 인덱스의 이미지 삭제
            }}
          >
            <Icon name="xCircle" size={24} />
          </button>
        </div>
      ))}
    </div>
  );
};
