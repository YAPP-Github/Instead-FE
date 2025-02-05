import Image from 'next/image';
import * as styles from './DragGuide.css';
import { Text } from '@repo/ui';
import DNDImage from '@web/assets/images/dndImage.webp';

type DragGuideProps = {
  description: string;
};

export function DragGuide({ description }: DragGuideProps) {
  return (
    <div className={styles.container}>
      <Text.H2
        className={styles.description}
        fontSize={20}
        fontWeight="semibold"
        color="grey500"
      >
        {description}
      </Text.H2>
      <Image
        src={DNDImage}
        alt="드래그 앤 드롭 이미지"
        className={styles.image}
      />
    </div>
  );
}
