import { motion } from 'motion/react';
import * as styles from './Modal.css';

type DimmerProps = {
  onClick?: VoidFunction;
};

export function Dimmer({ onClick }: DimmerProps) {
  return (
    <motion.div
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}
