import { motion } from 'motion/react';
import * as styles from './GradientAnimatedTitle.css';
import { ReactNode } from 'react';

type GradientAnimatedTitleProps = {
  children: ReactNode;
};

export function GradientAnimatedTitle({
  children,
}: GradientAnimatedTitleProps) {
  return (
    <motion.h1
      className={styles.gradientTitleStyle}
      initial={{
        y: '35vh',
        scale: 2,
        x: '-50%',
        left: '50%',
        position: 'absolute',
      }}
      animate={{
        y: 0,
        scale: 1,
        x: 0,
        left: 'auto',
        position: 'relative',
      }}
      transition={{
        type: 'spring',
        duration: 0.6,
        bounce: 0.22,
      }}
    >
      {children}
    </motion.h1>
  );
}
