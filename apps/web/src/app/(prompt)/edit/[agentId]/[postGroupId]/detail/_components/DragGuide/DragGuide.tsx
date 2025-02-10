import * as styles from './DragGuide.css';
import { Text } from '@repo/ui';

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
      <Text.H2
        className={styles.description}
        fontSize={20}
        fontWeight="semibold"
        color="grey500"
      >
        끌어서 여기에 놓아주세요
      </Text.H2>
    </div>
  );
}
