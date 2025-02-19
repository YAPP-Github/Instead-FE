import { GradientAnimatedText } from '@repo/ui';
import { motion, MotionProps } from 'motion/react';
import { ReactNode, forwardRef, ComponentPropsWithoutRef } from 'react';
import * as styles from './AnimatedTitle.css';

const animationOptions = {
  initial: {
    y: '35vh',
    scale: 2,
    x: '-50%',
    left: '50%',
    position: 'absolute',
  },
  animate: {
    y: 0,
    scale: 1,
    x: 0,
    left: 'auto',
    position: 'relative',
  },
  transition: {
    type: 'spring',
    duration: 0.6,
    bounce: 0.22,
  },
} as MotionProps;

type AnimatedTitleProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'h1'>;

export const AnimatedTitle = forwardRef<HTMLHeadingElement, AnimatedTitleProps>(
  ({ children, ...restProps }, ref) => {
    return (
      <motion.div {...animationOptions}>
        <GradientAnimatedText
          className={styles.titleStyle}
          ref={ref}
          {...restProps}
        >
          {children}
        </GradientAnimatedText>
      </motion.div>
    );
  }
);

AnimatedTitle.displayName = 'AnimatedTitle';
