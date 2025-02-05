'use client';

import { Icon } from '@repo/ui';
import * as styles from './UploadedImages.css';
import Image from 'next/image';

type UploadedImagesProps = {
  images: string[];
  onRemove: (index: number) => void;
};

const IMAGE_SIZE = 64;

export const UploadedImages = ({ images, onRemove }: UploadedImagesProps) => {
  return (
    <div className={styles.container}>
      {images.map((image, index) => (
        <div
          key={image}
          className={styles.imageWrapper}
          onClick={(e) => e.preventDefault()} // 이미지 클릭 시 삭제 방지
        >
          <Image
            src={image}
            alt={`업로드된 이미지 ${image}`}
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
              onRemove(index); // 해당하는 인덱스의 이미지 삭제
            }}
          >
            <Icon name="xCircle" color="grey700" size={24} />
          </button>
        </div>
      ))}
    </div>
  );
};
