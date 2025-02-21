'use client';

import { Icon } from '@repo/ui';
import * as styles from './UploadedImages.css';
import Image from 'next/image';

type UploadedImagesProps = {
  images: string[];
  onRemove: (url: string) => void;
};

export const UploadedImages = ({ images, onRemove }: UploadedImagesProps) => {
  return (
    <div className={styles.container}>
      {images.map((image) => (
        <div
          key={image}
          className={styles.imageWrapper}
          onClick={(e) => e.preventDefault()} // 이미지 클릭 시 삭제 방지
        >
          <Image
            src={image}
            alt={`업로드된 이미지 ${image}`}
            layout="fill"
            className={styles.image}
            quality={100}
          />
          <button
            type="button"
            className={styles.removeButton}
            onClick={(e) => {
              e.preventDefault(); // 기본 동작 차단
              e.stopPropagation(); // 이벤트 전파 차단
              onRemove(image); // 해당하는 인덱스의 이미지 삭제
            }}
          >
            <Icon name="xCircle" color="grey700" size={24} />
          </button>
        </div>
      ))}
    </div>
  );
};
