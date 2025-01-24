import { Text, TextProps } from '../../../Text';
import * as styles from './Description.css';

export type ModalDescriptionProps = TextProps<'p'>;

export function Description({
  fontSize = 20,
  fontWeight = 'medium',
  color = 'grey500',
  ...props
}: ModalDescriptionProps) {
  return (
    <Text.P
      fontSize={fontSize}
      fontWeight={fontWeight}
      color={color}
      className={styles.description}
      {...props}
    />
  );
}

Description.displayName = 'Modal.Description';
