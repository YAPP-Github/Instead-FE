import { motion } from 'motion/react';
import { ReactNode } from 'react';
import * as styles from './AnimatedContainer.css';

type AnimatedContainerProps = {
  children: ReactNode;
};

export function AnimatedContainer({ children }: AnimatedContainerProps) {
  return (
    <motion.div
      className={styles.containerStyle}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{
        type: 'spring',
        duration: 0.6,
        bounce: 0.22,
      }}
    >
      {children}
    </motion.div>
  );
}
