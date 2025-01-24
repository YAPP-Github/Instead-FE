import { Text, TextProps } from '../../../Text';
import * as styles from './Title.css';

export type ModalTitleProps = TextProps<'h2'>;

export function Title({
  fontSize = 28,
  fontWeight = 'bold',
  color = 'grey900',
  ...props
}: ModalTitleProps) {
  return (
    <Text.H2
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={styles.title}
      {...props}
    />
  );
}

Title.displayName = 'Modal.Title';
